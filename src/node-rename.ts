import * as fs from 'fs';
import * as path from 'path';

import { CASE_TYPES, CaseType, clearSpaces, rename } from './rename';
import { getGlob, isDir } from './utils';

interface Options {
    pattern: string;
    caseType: CaseType;
    ignore?: string;
}

/**
 * @returns Map old element name -> new element name
 */
export const nodeRename = (options: Options): Map<string, string> => {
    const { pattern, caseType, ignore } = options;
    const renamedItems = new Map<string, string>();

    if (caseType && !CASE_TYPES.includes(caseType)) {
        console.log(`Unknown case type ${caseType}. Select one of ${CASE_TYPES.join('|')}`);
        return renamedItems;
    }

    const foundItems: string[] = getGlob(pattern, { ignore });
    if (foundItems.length === 0) {
        console.log(`No items found for pattern: "${pattern}"`);
        return renamedItems;
    }

    /** First rename files, then folders */
    foundItems.sort((aPath: string, bPath: string) => Number(isDir(bPath)) - Number(isDir(aPath)));

    if (!caseType) {
        console.log(foundItems);
        return new Map(foundItems.map((item) => [item, item]));
    }

    /**
     * Renaming logic...
     */
    const renameFn = rename(caseType);
    const renamedNames = new Map<string, string>();
    foundItems.forEach((item: string) => {
        const { name, dir, ext } = path.parse(item);

        const newDir: string[] = [];
        const oldRenamedDir: string[] = [];
        dir.split('/').forEach((folder) => {
            const renamedName = renamedNames.get(folder) ?? folder;

            oldRenamedDir.push(renamedName);
            newDir.push(renamedName);
        });

        const newName = name
            .split('.')
            .map((it) => renameFn(it))
            .join('.');
        const newPath = clearSpaces(`${newDir.join('/')}/${newName}${ext}`);
        const oldPath = clearSpaces(`${oldRenamedDir.join('/')}/${name}${ext}`);
        renamedNames.set(name, newName);
        renamedItems.set(oldPath, newPath);

        try {
            fs.renameSync(oldPath, newPath);
        } catch (err) {
            console.log('Rename', String(err));
        }
    });

    console.log(`Renamed: ${renamedItems.size}) to ${caseType}.`);

    return renamedItems;
};
