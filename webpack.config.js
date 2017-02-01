/* global __dirname */

var path = require('path');

var webpack = require('webpack');
var jsDir = path.resolve(__dirname, './app');
var buildDir = path.resolve(__dirname, 'public');

module.exports = {
  entry: {
    app: path.resolve(jsDir, '../index.js')
  },
  devtool: null,
  output: {
    path: buildDir,
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', jsDir]
  },
  devServer: {
    contentBase: buildDir
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        presets: ['es2015', 'react']
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].html'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.NoErrorsPlugin()
  ],
  stats: {
    colors: true
  }
};
