module.exports = {
  extends: ['react-app', 'prettier'],
  plugins: [
    'prettier'
  ],
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'prettier/prettier': ["error", { "singleQuote": true }]
  }
}
