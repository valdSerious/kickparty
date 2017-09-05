const path = require('path')
const root = path.join(__dirname, '..')

module.exports = [
  {
    test: /\.js$/,
    loaders: (process.env.NODE_ENV === 'production') ? ['babel-loader', 'strip-loader?strip[]=console.log,strip[]=console.info,strip[]=console.warn,strip[]=console.error'] : ['babel-loader'],
    exclude: /node_modules/,
    include: root
  },
  {
    test: /\.css?$/,
    loaders: ['style', 'raw'],
    include: root
  },
  {
    test: /\.less$/,
    loader: 'style-loader!css-loader!less-loader'
  },
  {
    test: /\.scss$/,
    loader: 'style-loader!css-loader!sass-loader'
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg|mp4)$/,
    loader: 'url-loader?limit=100000'
  },
  {
    test: /\.(otf|ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
    loader: 'file-loader'
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  }
]
