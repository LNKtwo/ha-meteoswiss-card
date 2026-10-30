import javascript from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**', 'meteoswiss-weather-card.js'] },
  {
    files: ['src/**/*.ts'],
    plugins: { '@typescript-eslint': typescript },
    rules: {
      ...javascript.configs.recommended.rules,
      // TypeScript handles name resolution, overloads and type-only bindings.
      'no-undef': 'off',
      'no-redeclare': 'off',
      'no-dupe-class-members': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_',
      }],
    },
    languageOptions: {
      parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
];
