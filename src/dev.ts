import {
    camelCase,
    kebabCase,
    lowerCase,
    nodeRename,
    pascalCase,
    randomCase,
    snakeCase,
    trainCase,
    upperCase,
} from './';

console.log('lowerCase:', lowerCase('some sentence!'));
console.log('upperCase:', upperCase('some sentence!'));
console.log('pascalCase:', pascalCase('some sentence!'));
console.log('camelCase:', camelCase('some sentence!'));
console.log('snakeCase:', snakeCase('some sentence!'));
console.log('kebabCase:', kebabCase('some sentence!'));
console.log('trainCase:', trainCase('some sentence!'));
console.log('randomCase:', randomCase());

// @cli check: yarn build && node ./dist/cli.js -p "./temp/common/**" --case kebab --idle
console.log(
    nodeRename({
        pattern: 'src/**/*.ts',
        caseType: 'pascal',
        idle: true,
    })
);
