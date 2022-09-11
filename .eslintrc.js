module.exports = {
  plugins: ['@typescript-eslint', 'tailwindcss', 'no-loops'],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['.eslintrc.js', 'lint-staged.config.js', 'postcss.config.js', 'next.config.js', 'tailwind.config.js', 'prettier.config.js'], // prevent eslint from scanning this file
  rules: {
    'react/button-has-type': [
      'warn',
      {
        button: true,
        submit: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/type-annotation-spacing': ['warn', { after: true, before: false }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        selector: 'default',
        leadingUnderscore: 'allow',
      },
    ],
    '@typescript-eslint/no-confusing-void-expression': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'warn',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-constructor-return': 'warn',
    'no-duplicate-imports': 'error',
    'no-template-curly-in-string': 'warn',
    'capitalized-comments': 'warn',
    complexity: ['warn', 20],
    'default-case': 'warn',
    eqeqeq: 'error',
    'max-classes-per-file': ['error', 1],
    'max-depth': ['warn', 3],
    'max-params': ['warn', 3],
    'no-alert': 'error',
    'no-console': 'error',
    'no-else-return': 'warn',
    'no-magic-numbers': ['warn', { ignoreArrayIndexes: true, enforceConst: true, detectObjects: false }],
    'no-mixed-operators': 'warn',
    'no-nested-ternary': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    radix: 'error',
    // 'spaced-comment': ['warn', 'always'],
    'vars-on-top': 'warn',
    'max-len': [
      'error',
      {
        code: 180,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ], // max length per line, this must match prettier printWidth
    'max-lines': [
      'error',
      {
        max: 300,
        skipComments: true,
      },
    ], // max lines per file
    'no-loops/no-loops': 'error',
    '@next/next/no-img-element': 'off', // turn on when ready to use Nextjs Image
  },
};
