//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';
import perfectionist from 'eslint-plugin-perfectionist';

export default [
  {
    ignores: ['src/paraglide/**'],
  },
  ...tanstackConfig,
  perfectionist.configs['recommended-alphabetical'],
  {
    rules: {
      'perfectionist/sort-interfaces': ['error', { partitionByNewLine: true }],
      'perfectionist/sort-intersection-types': ['error', { type: 'line-length' }],
      'perfectionist/sort-maps': ['error', { partitionByNewLine: true }],
      'perfectionist/sort-object-types': ['error', { partitionByNewLine: true }],
      'perfectionist/sort-objects': ['error', { partitionByNewLine: true }],
      'perfectionist/sort-sets': ['error', { partitionByNewLine: true }],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports', prefer: 'type-imports' },
      ],
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],

      'import/order': 'off',
      'sort-imports': 'off',

      '@typescript-eslint/array-type': 'off',
    },
  },
];
