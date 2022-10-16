import camelcase from 'lodash.camelcase';
import kebabcase from 'lodash.kebabcase';
import snakcase from 'lodash.snakecase';
import pascalcase from 'lodash.startcase';

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
export const randomCase = () => Math.random().toString(32).slice(2);

export const rename = (type: CaseType) => {
    switch (type) {
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
            return randomCase;
        }
        default:
            throw new Error(`Unknown type ${type}`);
    }
};
