import * as glob from 'glob';

export function getGlob(pattern = '**/*', options: glob.IOptions = { ignore: '**/node_modules/**' }): string[] {
    const filePaths = glob.sync(pattern, options);

    return filePaths;
}
