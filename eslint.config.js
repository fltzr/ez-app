import { defineFlatConfig } from 'eslint-define-config';
import sheriff from 'eslint-config-sheriff';
import * as tanstackEslintPlugin from '@tanstack/eslint-plugin-query';

const sheriffOptions = {
  react: true,
  lodash: true,
  vitest: true,
};

export default defineFlatConfig([
  ...sheriff(sheriffOptions),
  {
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json'],
      },
    },
  },
  {
    plugins: {
      '@tanstack/query': tanstackEslintPlugin,
    },
    rules: {
      ...tanstackEslintPlugin.configs.recommended.rules,
      'no-console': 'off',
      'no-void': 'off',
      'no-param-reassign': ['off'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/react-in-jsx-scope': 'off',
      'import/no-named-as-default': 'off',
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'unknown',
          ],
          'pathGroups': [
            {
              pattern: 'vite*',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'react*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@cloudscape-design/global-styles/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@cloudscape-design/components/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/common/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/features/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/pages/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: './*.scss',
              group: 'unknown',
              position: 'after',
            },
          ],
          'pathGroupsExcludedImportTypes': ['react'],
          'newlines-between': 'ignore',
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]);
