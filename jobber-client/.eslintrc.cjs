module.exports = {
  env: { browser: true, es2020: true, 'jest/globals': true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      tsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react-refresh', 'simple-import-sort', 'jest', 'prettier'],
  'settings': {
    'react': {
      'version': 'detect' // Automatically detect the react version
    },
    'jest': {
      'version': 'detect',
      'globalAliases': {
        'describe': ['context'],
        'fdescribe': ['fcontext'],
        'xdescribe': ['xcontext']
      }
    }
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: true,
      }
    ],
    'react-refresh/only-export-components': 'warn',
    'no-multiple-empty-lines': [2, { 'max': 2 }],
    'semi': [2, 'always'],
    'curly': ['warn'],
    'prefer-template': ['warn'],
    'space-before-function-paren': [0, {'anonymous': 'always', 'named': 'always'}],
    'camelcase': 0,
    'no-return-assign': 0,
    'quotes': ['error', 'single'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-unresolved': 0,
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
    'import/no-named-as-default': 0
  },
};
