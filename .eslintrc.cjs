module.exports = {
  root: true,
  env: {
    'node': true,
    'commonjs': true,
    'browser': true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'import',],
  rules: {
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': ['error', {
      'newlines-between': 'always',
      'groups': [
        ['type'],
        ['builtin', 'external'],
        ['internal', 'parent', 'sibling', 'index']
      ],
      'alphabetize': {
        order: 'asc',
        caseInsensitive: true
      }
    }],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  },
}

