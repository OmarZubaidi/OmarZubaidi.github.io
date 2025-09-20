import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import vitest from '@vitest/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import testingLibrary from 'eslint-plugin-testing-library';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default defineConfig([
  {
    name: 'ignore/configs',
    ignores: [
      'build',
      'coverage',
      'dist',
      'node_modules',
      // it annoys me that i have to ignore config files, but it fails if i don't
      'eslint.config.js',
      'vite.config.ts',
      '.storybook',
      'vitest.shims.d.ts',
    ],
  },
  {
    name: 'eslint/options',
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    name: 'css/recommended',
    files: ['**/*.css'],
    language: 'css/css',
    plugins: { css },
    extends: ['css/recommended'],
  },
  {
    name: 'json/recommended',
    files: ['**/*.{json,jsonc}', '.vscode/*.code-workspace'],
    language: 'json/jsonc', // i like having comments in my json files
    plugins: { json },
    extends: ['json/recommended'],
  },
  {
    name: 'markdown/recommended',
    files: ['**/*.md'],
    language: 'markdown/gfm',
    plugins: { markdown },
    extends: ['markdown/recommended'],
  },
  {
    name: 'js/recommended',
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: { js, 'typescript-eslint': typescriptEslint },
    extends: ['js/recommended', 'typescript-eslint/strictTypeChecked', 'typescript-eslint/stylisticTypeChecked'],
  },
  {
    name: 'js/accessibility',
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    extends: [jsxA11y.flatConfigs.strict],
  },
  {
    name: 'js/react',
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { 'react-hooks': react },
  },
  {
    name: 'js/tests',
    files: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    ...testingLibrary.configs['flat/react'],
    languageOptions: {
      globals: vitest.environments.env.globals,
    },
    plugins: {
      testingLibrary,
      vitest,
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    rules: {
      ...vitest.configs.all.rules,
      'vitest/no-done-callback': 'off', // disable deprecated rule
      'vitest/no-hooks': 'off', // before/after hooks are far too useful to disable
    },
  },
  {
    name: 'js/storybook',
    files: ['**/*.stories.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { storybook },
    extends: [storybook.configs['flat/recommended'], storybook.configs['flat/csf-strict']],
  },
]);
