#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { CASE_TYPES, renameCli } from './rename';
import { DEFAULT_GLOB } from './utils';

export const runCli = () => {
    const argv = yargs(hideBin(process.argv))
        .usage('Usage: node-rename --case [camel|upper|...] --pattern "./src/**/*.ts"')
        .alias('c', 'case')
        .describe('c', `Rename case type. Available options: ${CASE_TYPES.join('|')}`)
        .alias('p', 'pattern')
        .describe('p', 'Pattern to find folders/files')
        .alias('i', 'ignore')
        .default('i', DEFAULT_GLOB.ignore)
        .describe('i', `Ignore files/folders. Default: "${DEFAULT_GLOB.ignore}"`)
        .alias('h', 'help')
        .alias('v', 'version')
        .demandOption(['case', 'pattern']).argv;

    // @ts-ignore
    renameCli(argv.pattern, argv.case, argv.ignore);
};

runCli();
