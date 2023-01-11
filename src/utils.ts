import * as fs from 'fs';
import * as glob from 'glob';

export function isDir(path: string): boolean {
    try {
        const stat = fs.lstatSync(path);

        return stat.isDirectory();
    } catch {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}

export const DEFAULT_GLOB = {
    ignore: 'node_modules/**',
};

export function getGlob(pattern = '**/*', options: glob.IOptions = { ignore: DEFAULT_GLOB.ignore }): string[] {
    const filePaths = glob.sync(pattern, options);

    return filePaths;
}
