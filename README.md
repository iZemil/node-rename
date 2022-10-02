# node-rename

Node functions for renaming files/folders to 'lower', 'upper', 'camel', 'pascal', 'snake', 'kebab', 'train', 'random' etc. case types; With cli support.

## Installation

-   Cli usage `npm install node-rename -g`
-   Node package usage `npm install node-rename`

## Usage

-   Cli help with example `node-rename --help`
-   Show files/folders without renaming them, add `--idle` flag: `node-rename --pattern "./src/**" --case upper --idle`
-   Simple cli example `node-rename --pattern "./src/**" --case kebab` (rename all files/folders in src directory to kebab case)
-   node package functions:

```typescript
import { camelCase, kebabCase, lowerCase, pascalCase, random, snakeCase, trainCase, upperCase } from './rename';

upperCase('some sentence!'); // "SOME SENTENCE!"
// ...
```
