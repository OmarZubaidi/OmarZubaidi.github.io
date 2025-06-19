import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import vitestPlugin from '@vitest/eslint-plugin';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default defineConfig([
  {
    name: 'ignore/configs',
    ignores: ['build', 'coverage', 'dist', 'node_modules', 'eslint.config.js', 'vite.config.ts'],
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
    files: ['**/*.{json,jsonc}'],
    language: 'json/jsonc', // i like having comments in my json files
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
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    extends: ['js/recommended', tsEslint.configs.strictTypeChecked, tsEslint.configs.stylisticTypeChecked],
    plugins: { js },
  },
  {
    name: 'accessibility/js',
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    ...jsxA11yPlugin.flatConfigs.strict,
    languageOptions: {
      ...jsxA11yPlugin.flatConfigs.strict.languageOptions,
    },
  },
  {
    name: 'react/js',
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      'react-hooks': reactPlugin,
    },
  },
  {
    name: 'tests/js',
    files: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...vitestPlugin.environments.env.globals,
      },
    },
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
]);
