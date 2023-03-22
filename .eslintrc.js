module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [],
  plugins: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    'prefer-arrow-callback': 'error',
    'import/group-exports': 'error',
    'import/exports-last': 'error',
    'import/no-default-export': 'error',
    '@typescript-eslint/key-spacing': 0,
    '@typescript-eslint/consistent-type-imports': 0,
    '@typescript-eslint/consistent-type-exports': 0,
    '@typescript-eslint/no-confusing-void-expression': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/triple-slash-reference': 0
  }
}
