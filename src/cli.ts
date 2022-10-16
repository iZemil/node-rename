#!/usr/bin/env node
import * as path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { nodeRename } from './node-rename';
import { CASE_TYPES, CaseType } from './rename';
import { DEFAULT_GLOB } from './utils';

interface ICliOptions {
    pattern: string;
    type?: CaseType;
    ignore?: string;
    log?: boolean;
    handler?: string;
}

export const runCli = async () => {
    const argv = yargs(hideBin(process.argv))
        .usage('Usage: node-rename --pattern "./src/**/*.ts" --type [camel|upper|...]')
        .option('pattern', {
            alias: 'p',
            type: 'string',
            description: `Pattern to find folders/files`,
            demandOption: true,
        })
        .option('type', {
            alias: 'c',
            type: 'string',
            description: `Rename case type. Available options: ${CASE_TYPES.join('|')}`,
        })
        .option('ignore', {
            type: 'string',
            description: `Ignore files/folders`,
            default: DEFAULT_GLOB.ignore,
        })
        .option('log', {
            type: 'boolean',
            description: 'Log all items without renaming',
        })
        .option('handler', {
            type: 'string',
            description: 'Custom renaming handler path',
        })
        .alias('h', 'help')
        .alias('v', 'version').argv as ICliOptions;

    const { pattern, type, ignore, log, handler } = argv;

    if (handler) {
        const handlerPath = path.resolve(handler);

        try {
            // eslint-disable-next-line
            const handlerFn = require(handlerPath);
            console.log('handler', handlerFn(''));

            nodeRename({ pattern, ignore, log, handler: handlerFn });
        } catch (e) {
            console.log(`Handler error: ${handlerPath}`);
        }
    } else {
        nodeRename({ pattern, type, ignore, log });
    }
};

runCli();
