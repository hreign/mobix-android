module.exports = {
  root: true,
  env: { node: true, browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'vue/multi-word-component-names': 'off',
  },
  ignorePatterns: ['dist', 'node_modules', 'app/public'],
}
