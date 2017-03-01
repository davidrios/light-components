'use strict';

var webpack = require('webpack')
var path = require('path')

var env = process.env.NODE_ENV
var config = {
  module: {
    loaders: [
      {
        test: /\.es6$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname),
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src'),
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'light-components': '../src'
    }
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config
