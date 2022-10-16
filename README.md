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

Show files/folders without renaming them:

```bash
node-rename --pattern "./src/**"
```

Then if you want to rename all files/folders within src directory to kebab case add case option:

```bash
node-rename --pattern "./src/**" --case kebab
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

// Rename files and folders:
nodeRename({
    pattern: 'src/**/*.ts',
    caseType: 'pascal', // caseType is optional, caseType: undefined, only returns files to rename
});
```
