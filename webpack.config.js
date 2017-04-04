const {join} = require('path')
const webpack = require('webpack')

module.exports = {
  entry: join(__dirname, 'src/lib.js'),

  output: {
    path: join(__dirname, 'build/dist'),
    filename: 'bundle.js',
    library: 'bn-components-react',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      join(__dirname),
      'node_modules',
    ],
  },
}
