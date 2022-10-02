import _camelCase from 'lodash.camelcase';
import _lowerCase from 'lodash.lowercase';
import _upperCase from 'lodash.uppercase';

const CASE_TYPES = [
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
] as const;

type CaseType = typeof CASE_TYPES[number];

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

export const rename = (str: string, caseType: CaseType) => {
    console.log(caseType);

    return str.toLowerCase();
};
