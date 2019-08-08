module.exports = {
  extends: ['react-app', 'prettier'],
  globals: {
    document: true,
    expect: true,
    process: true,
    test: true,
    jest: true,
    beforeEach: true,
    window: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'jsx-a11y',
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'react/jsx-indent': [1, 2],
    'react/prop-types': 1,
    'prettier/prettier': 'error'
  }
}
