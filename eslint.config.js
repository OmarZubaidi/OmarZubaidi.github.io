import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import jestPlugin from 'eslint-plugin-jest';
import reactPlugin from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default defineConfig([
  {
    name: 'ignore/configs',
    ignores: ['build', 'coverage', 'dist', 'node_modules', '**/eslint.config.js', '**/tsconfig*.json'],
  },
  {
    name: 'recommended/css',
    files: ['**/*.css'],
    language: 'css/css',
    extends: ['css/recommended'],
    plugins: { css },
  },
  {
    name: 'recommended/json',
    files: ['**/*.json'],
    language: 'json/json',
    extends: ['json/recommended'],
    plugins: { json },
  },
  {
    name: 'recommended/jsonc',
    files: ['**/*.jsonc'],
    language: 'json/jsonc',
    extends: ['json/recommended'],
    plugins: { json },
  },
  {
    name: 'recommended/markdown',
    files: ['**/*.md'],
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
    plugins: { markdown },
  },
  {
    name: 'recommended/js',
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    extends: ['js/recommended'],
    plugins: { js },
  },
  {
    name: 'recommended/ts',
    files: ['**/*.{ts,mts,cts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      ...tsEslint.configs.strictTypeChecked,
      ...tsEslint.configs.stylisticTypeChecked,
    },
    rules: {
      'no-unused-vars': 'off', // Handled by TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    name: 'recommended/react',
    files: ['**/*.{jsx,tsx}'],
    settings: { react: { version: 'detect' } },
    plugins: {
      ...reactPlugin.configs.flat.recommended,
      ...reactPlugin.configs.flat.style,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    name: 'tests/jest',
    files: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: globals.jest },
    ...jestPlugin.configs['flat/recommended'],
    ...jestPlugin.configs['flat/style'],
  },
]);
