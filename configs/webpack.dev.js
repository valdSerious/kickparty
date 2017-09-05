const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const LOADERS = require('./LOADERS')
const PRELOADERS = require('./PRELOADERS')
const root = path.join(__dirname, '..')

// // When inside Redux repo, prefer src to compiled version.
// // You can safely delete these lines in your project.
// const reduxSrc = path.join(root, 'src')
// const reduxNodeModules = path.join(root, 'node_modules')

const reduxSrc = path.join(__dirname, '..', '..', '..', 'src')
const reduxNodeModules = path.join(__dirname, '..', '..', '..', 'node_modules')

console.info('reduxSrc', reduxSrc)
console.info('reduxNodeModules', reduxNodeModules)

module.exports = {
  context: root,
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(root, 'src/index')
  ],
  output: {
    path: path.join(root, 'dist'),
    filename: 'bundle.min.js',
    publicPath: 'http://localhost:3000/static/'
  },
  resolve: {
    root: [
      root
    ],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: (process.env.NODE_ENV === 'local') ? JSON.stringify('http://localhost:3001/api') : JSON.stringify('https://testapi.kickparty.com/api')
      }
    })
  ],
  module: {
    // Shut off warnings about using pre-built javascript files
    // as Quill.js unfortunately ships one as its `main`.
    noParse: /node_modules\/quill\/dist/,
    preLoaders: PRELOADERS,
    loaders: LOADERS
  },
  eslint: {
    configFile: path.join(root, '.eslintrc')
  },
  externals: {
    'TweenMax': 'TweenMax'
  }
}

if (fs.existsSync(reduxSrc) && fs.existsSync(reduxNodeModules)) {
  // Resolve Redux to source
  module.exports.resolve = {
    alias: {
      'redux': reduxSrc
    }
  }

  // Compile Redux from source
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: ['babel'],
    include: reduxSrc
  })
}
