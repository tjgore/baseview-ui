module.exports = {
  printWidth: 180,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  jsxBracketSameLine: true,
  arrowParens: 'avoid',
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'always',
  singleAttributePerLine: true,
  jsxBracketSameLine: true,
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
};
