//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

const eslintConfig = [
  ...tanstackConfig,
  eslintPluginReactHooks.configs.flat.recommended,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      eslintPluginImport,
      'react-hooks': eslintPluginReactHooks,
    },
    settings: {
      'react-hooks': {
        additionalEffectHooks: '(useIsomorphicEffect)',
      },
    },
    rules: {
      'import/order': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
          custom: {
            regex: '^([A-Z]|[A-Z][A-Za-z]+)$',
            match: true,
          },
        },
      ],
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple',
        },
      ],
      'eslintPluginImport/order': [
        'warning',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@/services/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/entities/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/features/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: [],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'directive', next: 'import' },
      ],
      'react-hooks/exhaustive-deps': 'error',
    },
  },
];

export default eslintConfig;
