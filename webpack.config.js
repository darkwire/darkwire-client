const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'index.html',
  filename: 'index.html',
  inject: 'body',
})

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = new ExtractTextPlugin('styles.css')
const extractVendorCSS = new ExtractTextPlugin('vendor.css')

const getSassLoaders = () => ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']

const sourcePath = path.join(__dirname, './src')

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
    './index.js',
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
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',
  context: sourcePath,
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
  },
  entry: {
    main: getMain(),
    vendor: './vendor/vendor.js',
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
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader' },
      { test: /\.(eot|svg|ttf|woff|woff2)$/i, loader: 'file-loader' },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    HtmlWebpackPluginConfig,
    extractVendorCSS,
    extractCSS,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ].concat(plugins),
  devServer: {
    hot: process.env.NODE_ENV === 'development',
    historyApiFallback: true,
  },
}
