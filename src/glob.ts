import * as glob from 'glob';

export const DEFAULT = {
    ignore: 'node_modules/**',
};

export function getGlob(pattern = '**/*', options: glob.IOptions = { ignore: DEFAULT.ignore }): string[] {
    const filePaths = glob.sync(pattern, options);

    return filePaths;
}
