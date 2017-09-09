const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('styles.css');
const extractVendorCSS = new ExtractTextPlugin('vendor.css');

const getSassLoaders = () => {
  return ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
}

const plugins = []

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

if (process.env.NODE_ENV === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

const getMain = () => {
  const arr = [
    'babel-polyfill',
    './src/index.js'
  ]
  if (process.env.NODE_ENV === 'development') {
    arr.unshift(
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server'
    )
  }
  return arr
}

module.exports = {
  entry: {
    main: getMain(),
    vendor: './src/vendor/vendor.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name]-[hash].js',
    publicPath: '/',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.sass$/, loaders: getSassLoaders() },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader'},
      { test: /\.(eot|svg|ttf|woff|woff2)$/i, loader: 'file-loader'}
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    HtmlWebpackPluginConfig,
    extractVendorCSS,
    extractCSS,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Tether: 'tether'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
  ].concat(plugins),
  devServer: {
    hot: process.env.NODE_ENV === 'development',
    historyApiFallback: true
  }
}