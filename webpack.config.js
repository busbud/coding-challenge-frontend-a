var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var nodeEnv = process.env.NODE_ENV || 'development';
var isProd = nodeEnv === 'production';

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: isProd ? 'bundle.[chunkhash].js' : 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'src/index.html'})
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.less$/, loader: 'style!css!autoprefixer!less'}
    ]
  }
};
