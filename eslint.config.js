import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier/flat';
import globals from 'globals';
import unicorn from 'eslint-plugin-unicorn';

export default [
  {
    ignores: ['dist', 'node_modules', 'public', 'temp', '.vscode', 'vite.config.js'],
  },

  js.configs.recommended,
  prettierConfig,

  {
    files: ['**/*.js'],
    plugins: { unicorn: unicorn },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      camelcase: 'error',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      curly: ['error', 'all'],
      'new-cap': [
        'error',
        {
          newIsCap: true,
          capIsNew: false,
        },
      ],

      //unicorn
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-string-replace-all': 'error',

      'unicorn/no-new-array': 'error',
      'unicorn/no-array-push-push': 'error',
      'unicorn/no-unnecessary-await': 'error',
      'unicorn/no-zero-fractions': 'error',
      'unicorn/number-literal-case': 'error',
      'unicorn/escape-case': 'error',

      'unicorn/consistent-function-scoping': 'warn',
      'unicorn/prefer-ternary': 'warn',

      'unicorn/prevent-abbreviations': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-reduce': 'off',
    },
  },
];
