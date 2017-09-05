const http = require('http')
const express = require('express')
const path = require('path')
var cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
const PORT = process.env.PORT || 3000
const server = http.createServer(app)
/*const React = require('react')
const ReactDOMServer = require('react-dom/server')

// This is our React component, shared by server and browser thanks to browserify
const App = React.createFactory(require('./App'))*/




app.set('views', 'ejs')  // Specify the folder to find templates
app.set('view engine', 'ejs')

if (process.env.NODE_ENV === 'production') {
  // Have fun!
} else if (process.env.NODE_ENV === 'test') {
  const username = 'kick'
  const password = 'powday'

  app.use(function (req, res, next) {
    var auth = []

    if (req.query.un === username && req.query.pw === password) {
      res.cookie('un', username)
      res.cookie('pw', password)
      auth[0] = username
      auth[1] = password
    }

    if (req.cookies && req.cookies.un && req.cookies.pw) {
      if (req.cookies.un !== username || req.cookies.pw !== password) {
        // Stored pw doesn't match what they sent in.  May have changed, so clear it.
        res.clearCookie('un')
        res.clearCookie('pw')
      } else {
        auth[0] = username
        auth[1] = password
      }
    }

    if (auth.length === 0 && req.headers.authorization) {
      auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':')
    }

    if (auth.length === 0 || auth[0] !== username || auth[1] !== password) {
      res.statusCode = 401
      res.setHeader('WWW-Authenticate', 'Basic realm="KickParty"')
      res.end('Unauthorized')
    } else {
      // continue with processing, user was authenticated
      next()
    }
  })
} else {
  // USE WEBPACK FOR DEVELOPMENT
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./configs/webpack.dev')

  // Are we setting a var with the command
  // EX: API_URL=http://localhost:3001/api node server.js
  if (process.env.API_URL) {
    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(process.env.API_URL)
      }
    }))
  }

  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler))
}

// app.use(express.json()); // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

// Host static files from public/
app.use(express.static('./public'))

app.get('*', function (req, res) {
  res.sendFile(path.join(path.join(__dirname, '/public/index.html')))
})

// Catch all unknown routes.
app.all('/', function (request, response) {
  response.status(404).send('Page not found.')
})

server.listen(PORT, function (error) {
  if (error) {
    console.error(error)
  } else {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
      console.log('Served on port: ', PORT)
    } else {
      console.log('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', PORT, PORT)
    }
  }
})
