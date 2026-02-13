import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        Fuse: 'readonly'
      }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': ['warn'],
      'no-console': ['warn'],
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'brace-style': ['error', '1tbs'],
      'comma-dangle': ['error', 'never'],
      'no-var': ['error'],
      'prefer-const': ['error'],
      'arrow-spacing': ['error'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'prefer-arrow-callback': ['error'],
      'prefer-template': ['error'],
      'object-shorthand': ['error', 'always'],
      'prefer-destructuring': ['error', {
        array: true,
        object: true
      }]
    },
    ignores: ['node_modules/', 'public/', 'resources/', '.hugo_build.lock']
  }
];