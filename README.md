# node-rename &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/izemil/node-rename)

Tiny [NodeJS package](https://www.npmjs.com/package/node-rename) for renaming files/folders to 'lower', 'upper', 'camel', 'pascal', 'snake', 'kebab', 'train', 'random' case types. Also with cli support.

## Installation

-   Cli usage `npm i node-rename -g`
-   Node package usage `npm i node-rename`

## CLI Examples

Cli help to get full documentation:

```bash
node-rename --help
```

Show files/folders by pattern without renaming them:

```bash
node-rename --pattern "./src/**"
```

Then if you want to rename all files/folders within src directory to kebab case add case option:

```bash
node-rename --pattern "./src/**" --type kebab
```

Add "--log" option to see renaming result without renaming

```bash
node-rename --pattern "./src/**" --type kebab --log
```

### Custom renaming config

Create javascript file:

```javascript
// config.js
module.exports = function (text) {
    // any logic with renaming
    return text.replace('-', '');
};
```

Then run it:

```bash
node-rename --pattern "./src/**" --config "./config.js" --log
```

## Node package usage

Case type functions:

```typescript
import { camelCase, kebabCase, lowerCase, pascalCase, randomCase, snakeCase, trainCase, upperCase } from 'node-rename';

upperCase('some sentence!'); // "SOME SENTENCE!"
```

Rename files and folders:

```typescript
import { nodeRename } from 'node-rename';

nodeRename({
    pattern: 'src/**/*.ts',
    type: 'pascal', // type is optional, type: undefined, only returns files to rename
});

// Or cusom rename config
nodeRename({
    pattern: 'src/**/*.ts',
    config: (name: string) => name.replace('-', ''),
});
```
