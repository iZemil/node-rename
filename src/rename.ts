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

export const rename = (text: string, caseType: CaseType) => {
    console.log(caseType);

    return text.toLowerCase();
};
