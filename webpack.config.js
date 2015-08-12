var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    index: path.join(__dirname, 'icons', 'index.js')
  },
  output: {
    libraryTarget: 'commonjs2',
    path: __dirname,
    filename: 'index.js',
    pathinfo: false
  },
  resolve: {
    root: __dirname
  },
  module: {
    loaders: [{
      test: /\.svg$/,
      loader: path.join(__dirname, 'loaders/react-svg-loader')
    }]
  },
  externals: {
    react: 'react'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin()
  ]
};