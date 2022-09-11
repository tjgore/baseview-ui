const path = require('path');

const buildEslintCommand = filenames =>
  `next lint --file ${filenames
    .map(f => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  // Type checking
  '**/*.(ts|tsx)': "bash -c ' tsc -p ./tsconfig.json --noEmit'",

  // Format TypeScript and JavaScript files
  '**/*.(ts|tsx|js|md|json)': ['prettier --write .'],

  // Lint Typescript
  //'*.{ts,tsx}': [buildEslintCommand],
};
