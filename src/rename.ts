import * as fs from 'fs';
import _camelCase from 'lodash.camelcase';
import _lowerCase from 'lodash.lowercase';
import _upperCase from 'lodash.uppercase';
import * as path from 'path';

import { getGlob, isDir } from './utils';

export const CASE_TYPES = [
    'flat',
    'upper',
    'camel',
    'pascal',
    'snake',
    'upper_snake',
    'camel_snake',
    'pascal_snake',
    'kebab',
    'train',
    'upper_train',
    'terror',
] as const;

export type CaseType = typeof CASE_TYPES[number];

export const clearDelimiters = (str: string) => str.replace(/[\s*_#-]/g, '');

export const flatCase = (str: string) => str.toLowerCase() || _lowerCase(str);
export const upperCase = (str: string) => str.toUpperCase() || _upperCase(str);
export const camelCase = (str: string) => _camelCase(str);
export const pascalCase = (str: string) => str;
export const snakeCase = (str: string) => str;
export const upperSnakeCase = (str: string) => str;
export const camelSnakeCase = (str: string) => str;
export const pascalSnakeCase = (str: string) => str;
export const kebabCase = (str: string) => str;
export const trainCase = (str: string) => str;
export const upperTrainCase = (str: string) => str;
export const terrorCase = (str: string) => str;

export const rename = (caseType: CaseType) => {
    switch (caseType) {
        case 'flat': {
            return flatCase;
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
        case 'upper_snake': {
            return upperSnakeCase;
        }
        case 'camel_snake': {
            return camelSnakeCase;
        }
        case 'pascal_snake': {
            return pascalSnakeCase;
        }
        case 'kebab': {
            return kebabCase;
        }
        case 'train': {
            return trainCase;
        }
        case 'upper_train': {
            return upperTrainCase;
        }
        case 'terror': {
            return terrorCase;
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

    const renameFn = rename(caseType);
    const renamedParts = new Set<string>();
    foundItems.forEach((item: string) => {
        const { name, dir, ext } = path.parse(item);

        const newDir = renameFn(dir);
        const newName = renameFn(name);

        const oldPathRenamed: string[] = [];
        dir.split('/').forEach((i) => {
            oldPathRenamed.push(renamedParts.has(i) ? renameFn(i) : i);
        });

        const oldPath = `${oldPathRenamed.join('/')}/${name}${ext}`;
        const newPath = `${newDir}/${newName}${ext}`;

        if (!idle) {
            try {
                fs.renameSync(oldPath, newPath);
            } catch {
                console.log('rename err');
            }
        }

        renamedParts.add(name);
        console.log(`${item} => ${newPath}`);
    });

    console.log(`Renamed`);
};
