import { dirname } from 'path';
import { fileURLToPath } from 'url';

import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

// Path resolution for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Global ignores
const ignoresConfig = {
  ignores: [
    'node_modules/**',
    '.next/**',
    'dist/**',
    '**/.git/**',
    '**/*.css', // Ignore CSS files for ESLint
    '**/*.scss', // Ignore SCSS files for ESLint
  ],
};

// Language options shared across configurations
const languageOptions = {
  globals: {
    ...globals.browser,
    ...globals.es2022,
    ...globals.node,
  },
  ecmaVersion: 'latest',
  sourceType: 'module',
  parserOptions: {
    projectService: true,
    tsconfigRootDir: __dirname,
  },
};

// TypeScript configuration
const typescriptConfig = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ...languageOptions,
    parser: tsParser,
  },
  plugins: {
    '@typescript-eslint': typescript,
  },
  rules: {
    ...typescript.configs.recommended.rules,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',
  },
};

// React configuration
const reactConfig = {
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    react: eslintPluginReact,
    'react-hooks': eslintPluginReactHooks,
  },
  languageOptions: {
    ...languageOptions,
    parserOptions: {
      ...languageOptions.parserOptions,
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};

// Import and path rules configuration
const importRulesConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    import: eslintPluginImport,
  },
  rules: {
    // Import plugin rules
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'off', // TypeScript takes care of this
    'import/no-named-as-default-member': 'warn',
    'import/no-named-as-default': 'off',

    // Enforce import order
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node.js built-in modules
          'external', // External packages
          'internal', // Absolute imports
          'parent', // Imports from parent directories
          'sibling', // Imports from sibling directories
          'index', // Index imports
          'object', // Object imports
          'type', // Type imports
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: '@/**', // All imports starting with @ (absolute paths)
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    // Enforce absolute imports
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*'],
            message: 'Use absolute imports instead of relative imports',
          },
        ],
      },
    ],
  },
};

// Prettier configuration - must come last to override any conflicting rules
const prettierConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'], // Removed CSS and SCSS from Prettier via ESLint
  plugins: {
    prettier: eslintPluginPrettier,
  },
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    // Disable eslint rules that conflict with prettier
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
};

// Custom rules configuration
const customRulesConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};

export default [
  // Order matters! Configs at the bottom override earlier configs
  ignoresConfig,
  js.configs.recommended,
  typescriptConfig,
  reactConfig,
  importRulesConfig, // Import rules to enforce absolute paths and import order
  customRulesConfig,
  prettierConfig, // Prettier must be last to override conflicting rules
];
