# node-rename &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/izemil/node-rename)

Tiny [NodeJS package](https://www.npmjs.com/package/node-rename) for renaming files/folders to 'lower', 'upper', 'camel', 'pascal', 'snake', 'kebab', 'train', 'random' case types. Also with cli support.

## Installation

-   Cli usage `npm i node-rename -g`
-   Node package usage `npm i node-rename`

## Examples

Cli help to get full documentation:

```bash
node-rename --help
```

Simple cli example - rename all files/folders within src directory to kebab case:

```bash
node-rename --pattern "./src/**" --case kebab
```

Show files/folders without renaming them, add `--idle` flag:

```bash
node-rename --pattern "./src/**" --case upper --idle
```

Node package functions:

```typescript
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
} from 'node-rename';

upperCase('some sentence!'); // "SOME SENTENCE!"
// ...other cases...
nodeRename({
    pattern: 'src/**/*.ts',
    caseType: 'pascal',
    idle: true,
}); // Map with old -> new namings
```
