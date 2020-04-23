module.exports = {
  extends: [
    'airbnb'
  ],
  parser: 'babel-eslint',
  plugins: ['react'],
  env: {
    es6: true,
    browser: true,
    node: true
  },
  rules: {
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': 'off'
  }
};
