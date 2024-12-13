import { defineConfig } from 'eslint-define-config';
import eslintPluginImport from 'eslint-plugin-import';

export default defineConfig({
  languageOptions: {
    globals: {
      node: 'readonly',
      commonjs: 'readonly',
      browser: 'readonly',
      es2020: 'readonly',
    },
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  },
  settings: { react: { version: '18.2' } },
  plugins: {
    import: eslintPluginImport,
  },
  ignores: ['dist', 'eslint.config.cjs', 'eslint.config.js'],
  files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
  rules: {
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/order': [
      'error',
      {
        groups: [['builtin'], ['external'], ['internal', 'parent', 'sibling', 'index']],
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
            pattern: '#/**/*',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        'newlines-between': 'always',
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
});
