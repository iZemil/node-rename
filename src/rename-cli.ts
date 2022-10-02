import * as fs from 'fs';
import * as path from 'path';

import { CASE_TYPES, CaseType, clearSpaces } from './rename';
import { rename } from './rename';
import { getGlob, isDir } from './utils';

interface ICliOptions {
    pattern: string;
    caseType: CaseType;
    ignore?: string;
    idle?: boolean;
}
export const renameCli = (options: ICliOptions) => {
    const { pattern, caseType, ignore, idle } = options;

    if (!CASE_TYPES.includes(caseType)) {
        console.log(`Unknown case type ${caseType}. Select one of ${CASE_TYPES.join('|')}`);
        return;
    }

    const foundItems: string[] = getGlob(pattern, { ignore });
    if (foundItems.length === 0) {
        console.log(`No items found for pattern: "${pattern}"`);
        return;
    }

    /** First rename files, then folders */
    foundItems.sort((aPath: string, bPath: string) => {
        return Number(isDir(bPath)) - Number(isDir(aPath));
    });

    /**
     * Renaming logic...
     */
    const renameFn = rename(caseType);
    // old element name -> new element name
    const renamedData = new Map<string, string>();
    foundItems.forEach((item: string) => {
        const { name, dir, ext } = path.parse(item);

        const newDir: string[] = [];
        const oldRenamedDir: string[] = [];
        dir.split('/').forEach((folder) => {
            const renamedDir = renamedData.get(folder) ?? folder;

            oldRenamedDir.push(renamedDir);
            newDir.push(renamedDir);
        });

        const newName = name
            .split('.')
            .map((it) => renameFn(it))
            .join('.');
        const newPath = clearSpaces(`${newDir.join('/')}/${newName}${ext}`);
        const oldPath = clearSpaces(`${oldRenamedDir.join('/')}/${name}${ext}`);
        renamedData.set(name, newName);
        console.log(`${oldPath} => ${newPath}`);

        const withRename = !idle;
        if (withRename) {
            try {
                fs.renameSync(oldPath, newPath);
            } catch (err) {
                console.log('Rename', String(err));
            }
        }
    });

    console.log(`Renamed (${renamedData.size}) to ${caseType}.`);
};
