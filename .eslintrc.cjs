module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es2020: true,
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
  plugins: ['react-refresh', 'import'],
  rules: {
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/order': [
      'error',
      {
        groups: [['type'], ['builtin', 'external'], ['internal', 'parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-dom/client',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-router-dom',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@common/*',
            group: 'internal',
          },
          {
            pattern: '@pages/*',
            group: 'internal',
          },
          {
            pattern: '@routes',
            group: 'internal',
          },
          {
            pattern: '@services',
            group: 'internal',
          },
          {
            pattern: '@utils',
            group: 'internal',
          },
          {
            pattern: '@useContext',
            group: 'internal',
          },
          {
            pattern: '@constants',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@assets/*',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
