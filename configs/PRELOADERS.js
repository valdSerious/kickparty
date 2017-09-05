const PRELOADERS = []

if (process.env.NODE_ENV !== 'production') {
  PRELOADERS.push({
    test: /\.js$/,
    loader: 'eslint-loader',
    exclude: /node_modules/
  })
}

module.exports = PRELOADERS
