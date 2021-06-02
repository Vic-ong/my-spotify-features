module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'require-jsdoc': 'off',
    'quotes': ['error', 'single'],
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true }],
    'camelcase': 'off',
    '@typescript-eslint/camelcase': 'off',
  },
  settings: {
    'import/resolver': {
      'alias': [
        ['@', './src'],
      ],
      'typescript': {
        'alwaysTryTypes': true,
        '@/': ['/src/*'],
      },
    },
  },
};
