import { camelCase, kebabCase, lowerCase, pascalCase, random, snakeCase, trainCase, upperCase } from './rename';
import { getGlob } from './utils';

console.log(getGlob('**/*.ts', { ignore: ['node_modules/**', 'src/**'] }));

console.log(lowerCase('some sentence!'));
console.log(upperCase('some sentence!'));
console.log(pascalCase('some sentence!'));
console.log(camelCase('some sentence!'));
console.log(snakeCase('some sentence!'));
console.log(kebabCase('some sentence!'));
console.log(trainCase('some sentence!'));
console.log(random('some sentence!'));

// @cli check: yarn build && node ./dist/cli.js -p "./temp/common/**" --case kebab --idle
