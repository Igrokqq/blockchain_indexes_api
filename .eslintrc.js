module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb-base',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/class-methods-use-this': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-return': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'no-useless-constructor': 'off',
    'consistent-return': 'off',
    'no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-shadow': 'off'
  },
  overrides: [
    {
      files: ['src/common/database/mysql/migration/*.ts'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['src/modules/**/*.errors.ts'],
      rules: {
        '@typescript-eslint/max-classes-per-file': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/import/prefer-default-export': 'off',
        'import/prefer-default-export': 'off',
        'max-classes-per-file': 'off',
      },
    },
  ],
};
