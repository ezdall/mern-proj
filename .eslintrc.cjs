module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  parserOptions: { ecmaVersion: '2020', sourceType: 'module' },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    // 'no-console': 'off',
    // 'no-alert': 'off',
    'no-unused-vars': 'warn',
    'react/prop-types': 'off'
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  settings: { react: { version: '18.2' } }
};
