const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const LOADERS = require('./LOADERS')
const PRELOADERS = require('./PRELOADERS')

var plugins = []

if (process.env.NODE_ENV === config.PROD) {
  console.log('PROD PLUGINS')
  var prodPlugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin({}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        booleans: true,
        cascade: true,
        comparisons: true,
        conditionals: true,
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
        evaluate: true,
        hoist_funs: true,
        hoist_vars: true,
        if_return: true,
        join_vars: true,
        loops: true,
        negate_iife: true,
        properties: true,
        sequences: true,
        unsafe: true,
        unused: true,
        warnings: false
      },
      mangle: {
        toplevel: true,
        sort: true,
        eval: true,
        properties: true
      },
      output: {
        space_colon: false,
        comments: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(config.API_PROD),
        NODE_ENV: JSON.stringify(config.PROD),
        RAYGUN_KEY: JSON.stringify(config.RAYGUN_PROD)
      }
    })
  ]

  plugins = plugins.concat(prodPlugins)
} else {
  console.log('STAGING PLUGINS')
  var stagePlugins = [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(config.API_TEST),
        NODE_ENV: JSON.stringify(config.TEST),
        RAYGUN_KEY: JSON.stringify(config.RAYGUN_STAGE)
      }
    })
  ]

  plugins = plugins.concat(stagePlugins)
}

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public', 'static'),
    filename: 'bundle.min.js',
    publicPath: '/static/'
  },
  resolve: {
    root: [
      __dirname,
      path.join(__dirname, 'src')
    ],
    extensions: ['', '.js', '.jsx']
  },
  plugins: plugins,
  module: {
    // Shut off warnings about using pre-built javascript files
    // as Quill.js unfortunately ships one as its `main`.
    noParse: /node_modules\/quill\/dist/,
    preLoaders: PRELOADERS,
    loaders: LOADERS
  }
}
