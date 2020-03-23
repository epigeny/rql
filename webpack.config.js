const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'rql.js',
    library: 'RQL',
    globalObject: 'this',
    path: path.resolve(__dirname, 'dist'),
  },
};
