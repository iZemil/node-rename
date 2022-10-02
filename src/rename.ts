import * as fs from 'fs';
import camelcase from 'lodash.camelcase';
import kebabcase from 'lodash.kebabcase';
import snakcase from 'lodash.snakecase';
import pascalcase from 'lodash.startcase';
import * as path from 'path';

import { getGlob, isDir } from './utils';

export const CASE_TYPES = ['lower', 'upper', 'camel', 'pascal', 'snake', 'kebab', 'train', 'random'] as const;

export type CaseType = typeof CASE_TYPES[number];

export const clearDelimiters = (str: string) => str.replace(/[\s*_#-]/g, '');
export const clearSpaces = (str: string) => str.replace(/\s/g, '');

export const lowerCase = (str: string) => str.toLowerCase();
export const upperCase = (str: string) => str.toUpperCase();
export const pascalCase = (str: string) => pascalcase(str);
export const camelCase = (str: string) => camelcase(str);
export const snakeCase = (str: string) => snakcase(str);
export const kebabCase = (str: string) => kebabcase(str);
export const trainCase = (str: string) => pascalCase(kebabcase(str));
export const random = (str: string) => Math.random().toString(32).slice(2);

export const rename = (caseType: CaseType) => {
    switch (caseType) {
        case 'lower': {
            return lowerCase;
        }
        case 'upper': {
            return upperCase;
        }
        case 'camel': {
            return camelCase;
        }
        case 'pascal': {
            return pascalCase;
        }
        case 'snake': {
            return snakeCase;
        }
        case 'kebab': {
            return kebabCase;
        }
        case 'train': {
            return trainCase;
        }
        case 'random': {
            return random;
        }
        default:
            throw new Error(`Unknown type ${caseType}`);
    }
};

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
     * Renaming...
     */
    const renameFn = rename(caseType);
    // old element name -> new element name
    const renamedData = new Map<string, string>();
    foundItems.forEach((item: string) => {
        const { name, dir, ext } = path.parse(item);

        const newDir: string[] = [];
        const oldRenamedDir: string[] = [];
        dir.split('/').forEach((folder) => {
            const renamedDir = renamedData.get(folder) ?? renameFn(folder);

            oldRenamedDir.push(renamedData.get(folder) ?? folder);
            newDir.push(renamedDir);
            renamedData.set(folder, renamedDir);
        });

        const oldPath = `${oldRenamedDir.join('/')}/${name}${ext}`;
        const newName = renameFn(name);
        const newPath = clearSpaces(`${newDir.join('/')}/${newName}${ext}`);
        renamedData.set(name, newName);

        if (!idle) {
            try {
                fs.renameSync(oldPath, newPath);
            } catch {
                console.log('rename err');
            }
        }

        console.log(`${item} => ${newPath}`);
    });

    console.log(`Renamed to ${caseType}.`);
};
