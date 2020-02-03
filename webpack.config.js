const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'rql.js',
    library: 'rql',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
};
