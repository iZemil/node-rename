#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { DEFAULT } from './glob';
import { CASE_TYPES, renameCli } from './rename';

export const runCli = () => {
    const argv = yargs(hideBin(process.argv))
        .usage('Usage: node-rename --case [camel|upper|...] --pattern "./src/**/*.ts"')
        .alias('c', 'case')
        .describe('c', `Rename case type. Available options: ${CASE_TYPES.join('|')}`)
        .alias('p', 'pattern')
        .describe('p', 'Pattern to find folders/files')
        .default('p', DEFAULT.ignore)
        .alias('i', 'ignore')
        .describe('i', `Ignore files/folders. Default: "${DEFAULT.ignore}"`)
        .alias('h', 'help')
        .alias('v', 'version')
        .demandOption(['c', 'p']).argv;

    // @ts-ignore
    renameCli(argv.pattern, argv.case, argv.ignore);
};

runCli();
