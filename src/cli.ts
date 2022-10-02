#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { nodeRename } from './node-rename';
import { CASE_TYPES, CaseType } from './rename';
import { DEFAULT_GLOB } from './utils';

export const runCli = () => {
    const argv = yargs(hideBin(process.argv))
        .usage('Usage: node-rename --case [camel|upper|...] --pattern "./src/**/*.ts"')
        .option('case', {
            alias: 'c',
            type: 'string',
            description: `Rename case type. Available options: ${CASE_TYPES.join('|')}`,
            demandOption: true,
        })
        .option('pattern', {
            alias: 'p',
            type: 'string',
            description: `Pattern to find folders/files`,
            demandOption: true,
        })
        .option('idle', {
            alias: 'i',
            type: 'boolean',
            description: 'Log all items without renaming',
        })
        .option('ignore', {
            type: 'string',
            description: `Ignore files/folders`,
            default: DEFAULT_GLOB.ignore,
        })
        .alias('h', 'help')
        .alias('v', 'version').argv as {
        pattern: string;
        case: CaseType;
        ignore: string;
        idle?: boolean;
    };

    nodeRename({ pattern: argv.pattern, caseType: argv.case, ignore: argv.ignore, idle: argv.idle });
};

runCli();
