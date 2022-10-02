import * as fs from 'fs';
import _camelCase from 'lodash.camelcase';
import _kebabcase from 'lodash.kebabcase';
import _lowerCase from 'lodash.lowercase';
import _snakcase from 'lodash.snakecase';
import _startcase from 'lodash.startcase';
import _upperCase from 'lodash.uppercase';
import * as path from 'path';

import { getGlob, isDir } from './utils';

export const CASE_TYPES = ['lower', 'upper', 'camel', 'pascal', 'snake', 'pascal_snake', 'kebab', 'train'] as const;

export type CaseType = typeof CASE_TYPES[number];

export const clearDelimiters = (str: string) => str.replace(/[\s*_#-]/g, '');

export const lowerCase = (str: string) => _lowerCase(str);
export const upperCase = (str: string) => _upperCase(str);
export const camelCase = (str: string) => _camelCase(str);
export const pascalCase = (str: string) => _startcase(str);
export const snakeCase = (str: string) => _snakcase(str);
export const kebabCase = (str: string) => _kebabcase(str);
export const pascalSnakeCase = (str: string) => pascalCase(_snakcase(str));
export const trainCase = (str: string) => pascalCase(_kebabcase(str));

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
        case 'pascal_snake': {
            return pascalSnakeCase;
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
