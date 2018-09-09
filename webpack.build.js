const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('./package.json');

const libraryName = pkg.name;

module.exports = {
  entry: {
    main: ['./src/index.jsx'],
  },
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'README.md', to: './' },
      { from: 'package.json', to: './' },
    ]),
  ],
};
