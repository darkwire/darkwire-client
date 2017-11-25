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

const getSassLoaders = () => ['style-loader', 'css-loader?sourceMap=true&localIdentName=[path][name]--[local]&importLoaders=1', 'postcss-loader', 'sass-loader']

const sourcePath = path.join(__dirname, './src')

const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const plugins = [
  new FaviconsWebpackPlugin({
    logo: `${sourcePath}/img/logo-dark.png`,
    icons: {
      android: false,
      appleIcon: false,
      appleStartup: false,
      coast: false,
      favicons: true,
      firefox: false,
      opengraph: false,
      twitter: false,
      yandex: false,
      windows: false
    }
  }),
]

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
      { test: /\.css$/, loaders: ['style-loader', 'css-loader?sourceMap=true&localIdentName=[path][name]--[local]&importLoaders=1', 'postcss-loader'] },
      { test: /\.sass$/, loaders: getSassLoaders() },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader' },
      { test: /\.(eot|svg|ttf|woff|woff2)$/i, loader: 'file-loader' },
      { test: /\.(mp3)$/i, loader: 'file-loader' },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
    publicPath: '/',
    historyApiFallback: true,
    port: 8080,
    compress: false,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },      
    },
  },
}
