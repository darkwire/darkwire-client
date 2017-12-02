const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'index.html',
  filename: 'index.html',
  inject: 'body',
})

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = new ExtractTextPlugin({
  filename: 'styles-[hash].css'
})
const extractVendorCSS = new ExtractTextPlugin({
  filename: 'vendor-[hash].css'
})

const cssLoaderDev = 'css-loader?sourceMap=true&localIdentName=[path][name]--[local]&importLoaders=1';

const getSassLoaders = () => {
  if (process.env.NODE_ENV === 'development') {
    return ['style-loader', cssLoaderDev, 'postcss-loader', 'sass-loader'];
  } else {
    return extractCSS.extract(['css-loader', 'postcss-loader', 'sass-loader']);
  }
}

const getCssLoaders = () => {
  if (process.env.NODE_ENV === 'development') {
    return ['style-loader', cssLoaderDev, 'postcss-loader'];
  } else {
    return extractVendorCSS.extract(['css-loader', 'postcss-loader']);
  }
}

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
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: getCssLoaders() },
      { test: /\.sass$/, use: getSassLoaders() },
      { test: /\.(jpe?g|png|gif|svg)$/i, use: 'file-loader' },
      { test: /\.(eot|svg|ttf|woff|woff2)$/i, use: 'file-loader' },
      { test: /\.(mp3)$/i, use: 'file-loader' },
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
        API_HOST: JSON.stringify(process.env.API_HOST),
        API_PROTOCOL: JSON.stringify(process.env.API_PROTOCOL),
        API_PORT: JSON.stringify(process.env.API_PORT),
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
