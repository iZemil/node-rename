#!/usr/bin/env node
import * as fs from 'fs/promises';
import * as path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { CONFIG_PATH } from './consts';
import { nodeRename } from './node-rename';
import { CASE_TYPES, CaseType } from './rename';
import { DEFAULT_GLOB } from './utils';

export const initConfig = async () => {
    try {
        await fs.copyFile(path.resolve(__dirname, `default.js`), CONFIG_PATH);

        console.log(`Configuration file was created:\n> ${CONFIG_PATH}`);
    } catch (e) {
        console.error(e);
    }
};

interface ICli {
    pattern: string;
    type?: CaseType;
    ignore?: string;
    log?: boolean;
    config?: string;
}

export const runCli = async () => {
    const argv = yargs(hideBin(process.argv))
        .usage('Usage: node-rename --pattern "./src/**/*.ts" --type [camel|upper|...]')
        .command('init', 'Create config file', (args) => {
            initConfig();
        })
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
        .option('config', {
            type: 'string',
            description: 'Custom renaming config path',
        })
        .alias('h', 'help')
        .alias('v', 'version').argv as ICli;

    const { pattern, type, ignore, log, config } = argv;

    if (config) {
        const handlerPath = path.resolve(config);

        try {
            // eslint-disable-next-line
            const handlerFn = require(handlerPath);
            console.log('config', handlerFn(''));

            nodeRename({ pattern, ignore, log, config: handlerFn });
        } catch (e) {
            console.log(`Handler error: ${handlerPath}`);
        }
    } else {
        nodeRename({ pattern, type, ignore, log });
    }
};

runCli();
