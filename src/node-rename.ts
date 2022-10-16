import * as fs from 'fs';
import * as path from 'path';

import { CASE_TYPES, CaseType, clearSpaces, rename } from './rename';
import { getGlob, isDir } from './utils';

interface Options {
    pattern: string;
    type?: CaseType;
    handler?: (text: string) => string;
    ignore?: string;
    log?: boolean;
}

/**
 * @returns Map old element name -> new element name
 */
export const nodeRename = (options: Options): Map<string, string> => {
    const { pattern, type, ignore, log, handler } = options;
    const renamedItems = new Map<string, string>();

    if (type && !CASE_TYPES.includes(type)) {
        console.log(`Unknown case type ${type}. Select one of ${CASE_TYPES.join('|')}`);
        return renamedItems;
    }

    const foundItems: string[] = getGlob(pattern, { ignore });
    if (foundItems.length === 0) {
        console.log(`No items found for pattern: "${pattern}"`);
        return renamedItems;
    }

    /** First rename files, then folders */
    foundItems.sort((aPath: string, bPath: string) => Number(isDir(bPath)) - Number(isDir(aPath)));

    if (!type && !handler) {
        console.log(foundItems.join('\n'));
        console.log(`Found by pattern: ${foundItems.length} items.`);
        return new Map(foundItems.map((item) => [item, item]));
    }

    /**
     * Renaming logic...
     */
    const renameFn = handler ?? rename(type ?? 'lower');
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

        if (log) {
            console.log(`${oldPath} => ${newPath}`);
        } else {
            try {
                fs.renameSync(oldPath, newPath);
            } catch (err) {
                console.log('Rename', String(err));
            }
        }
    });

    const finishWords = (start: string) => `${start} ${renamedItems.size} items to ${type ?? 'custom renamer'}.`;

    if (log) {
        console.log(finishWords(`Will be renamed:`));
    } else {
        console.log(finishWords(`Renamed:`));
    }

    return renamedItems;
};
