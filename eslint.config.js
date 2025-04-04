import { defineConfig } from 'eslint-define-config';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        node: 'readonly',
        commonjs: 'readonly',
        browser: 'readonly',
        es2020: 'readonly',
      },
    },
    settings: {
      react: { version: '18.2' },
    },
    plugins: {
      import: eslintPluginImport,
      'react-refresh': eslintPluginReactRefresh,
      'unused-imports': eslintPluginUnusedImports,
      react: eslintPluginReact,
    },
    files: ['**/*.jsx', '**/*.js'],
    rules: {
      'import/no-unresolved': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
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
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
]);
