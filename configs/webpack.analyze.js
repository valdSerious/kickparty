const path = require('path')
const webpack = require('webpack')
const LOADERS = require('./LOADERS')

var plugins = [
  // new webpack.AppCachePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.AggressiveMergingPlugin({}),
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    }
  }),
  new webpack.DefinePlugin({
    'process.env': {
      API_URL: JSON.stringify('https://testapi.kickparty.com/api'),
      NODE_ENV: JSON.stringify('test')
    }
  })
]

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'temp'),
    filename: 'bundle.analyze.js',
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
