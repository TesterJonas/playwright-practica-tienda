const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const playwright = require('eslint-plugin-playwright');
const globals = require('globals');

module.exports = tseslint.config(
  {
    ignores: [
      'node_modules/',
      'playwright-report/',
      'test-results/',
      'playwright/.cache/',
      'eslint.config.cjs',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    ...playwright.configs['flat/recommended'],
    rules: {
      'no-console': 'warn',
    },
  }
);