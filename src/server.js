require('babel-register')({
  extensions: ['.es6', '.es', '.jsx', '.js']
})

// dotenv loads a local ".env" file and adds any variables defined inside to process.env
require('dotenv').config()

if (process.env.NODE_ENV === 'production') {
  require('pmx').init()
}

var fs = require('fs')
var debug = require('debug')('iOverlander:Server')

var express = require('express')
var helmet = require('helmet')
var csp = require('helmet-csp')
var flash = require('connect-flash')
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var Html = require('./components/Html').default
var enableApi = require('./api')
var passport = require('./helpers/authenticationStrategy').default
var proxy = require('express-http-proxy')
var Sequelize = require('sequelize')
var compression = require('compression')
var multer = require('multer')
var upload = multer({ dest: 'tmp/' })
var SequelizeStore = require('connect-session-sequelize')(session.Store)
var createUploadClient = require('./helpers/awsClient').default
var http2 = require('spdy')

var config = require('config')
var sessionDB = new Sequelize(config.get('sessionDb.database'), config.get('sessionDb.username'), config.get('sessionDb.password'),config.get('sessionDb'))

var makeClientConfig = require('./client_config').default

// Create session DB
sessionDB.sync()

debug('Server booting')

var Router = require('./routing/Router').default
var createApplicationStore = require('./store/ApplicationStore').default
var setUser = require('./actions/setUser').setUser
var Container = require('./components/Container').default

var ApplicationStore = createApplicationStore()

var setCurrentRoute = require('./actions/navigationActions').updateCurrentRoute

const app = express()
const routes = ApplicationStore.getState().routes

debug('Starting server')

// Routes
debug('Setting Routes')
Router.setRoutes(routes)

// Middleware
app.use(helmet())

const inlineScriptNonce = Math.random().toString(36).substring(7)
if (process.env.NODE_ENV === 'production') {
  app.use(csp(
    {
      directives: {
        scriptSrc: ["'self'", config.get('assets.host'), 'open.mapquestapi.com', `'nonce-${inlineScriptNonce}'`],
        styleSrc: ["'self'", config.get('assets.host'), 'fonts.googleapis.com', 'cdnjs.cloudflare.com', "'unsafe-inline'"],
        imgSrc: ["'self'", config.get('assets.host'),  '*.ioverlander.com', 'data:', '*.tile.openstreetmap.org', 'cdnjs.cloudflare.com', '*.tiles.mapbox.com', '*.mqcdn.com', '*.mapquestapi.com', 's3-us-west-2.amazonaws.com'],
        fontSrc: ["'self'", config.get('assets.host'), 'fonts.gstatic.com'],
        objectSrc: ["'none'"]
      }
    }
  ))
}

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.get('sessionSettings.secret'),
  store: new SequelizeStore({ db: sessionDB }),
  cookie: {
    secure: config.get('sessionSettings.secure'),
    domain: config.get('domain')
    }
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Healthcheck
app.get('/private/health', (req, res) => {
  res.json({ UP: true })
})

// CORS
app.use(function (req, res, next) {
  if (req.hostname.indexOf('ioverlander') > -1 || req.hostname === 'localhost') {
    res.set('Access-Control-Allow-Origin', '*')
  }
  next()
})

// Login is special
app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (info && info.message) { req.flash('error', info.message) }
    if (err) { return next(err) }
    if (!user) { return res.redirect('/users/sign_in') }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      req.session.save(() => {
        return res.redirect(req.session.targetUrl || '/blogs/' + user.blog_id)
      })
    })
  })(req, res, next)
})

// Logout is also special
app.get('/logout', function (req, res) {
  req.logout()
  req.session.destroy()
  res.set('Set-cookie', 'connect.sid=DEL;expires=Sun, 15 Jul 2012 00:00:01 GMT')
  res.redirect('/')
})

app.get('/getUserInfo', function (req, res, next) {
  res.json(req.user)
})

var models = require('./db/models')
var moment = require('moment')

app.post('/photos/upload', upload.array('photos', 5), (req, res, next) => {
const images = []

req.files.forEach((file, index) => {
  models.images.build({
    source_url: null,
    guid: null,
    blog_id: req.user.blog_id,
    imageable_id: req.body.check_in_id,
    imageable_type: 'CheckIn|BETA',
    pgfile_fingerprint: null,
    created_at: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
    jpgfile_file_name: file.originalname,
    jpgfile_content_type: file.mimetype,
    jpgfile_file_size: file.size,
    jpgfile_updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
    jpgfile_processing: false
  }).save().then((image) => {
    const client = createUploadClient(image.id)

    client.upload(`tmp/${file.filename}`, {}, function (err, versions, meta) {
      if (err) { throw err }
      versions.forEach(function (image) {
        if (image.url.indexOf('small') > -1) {
          images.push(image.url)
        }
      })

      if (index === (req.files.length - 1)) {
        res.status(200)
        res.json({
          previews: images
        })
      }
    })
  })
})
})

debug('Setting API Routes')
enableApi(app)

// Handle Requests
app.use((req, res, next) => {
  debug('SessionUser exists? ', !!req.user)
  const appStore = createApplicationStore()
  const route = Router.getRoute(req, req.user)

  if (route.redirect) {
    if (route.message) { req.flash('error', route.message) }
    res.redirect(302, route.path)
    return
  }

  const waitForRender = route.action ? appStore.dispatch(route.action(route, req.user)) : new Promise((res, rej) => res())

  route.path = route.path || req.path

  waitForRender.then(() => {
    appStore.dispatch(setCurrentRoute(route))
    appStore.dispatch(setUser(req.user))
    appStore.dispatch({
      type: 'SET_FLASH',
      flashMessage: req.flash('error')
    })

    if (route.handler.prototype instanceof React.Component) {
      const routeComponent = React.createElement(Container, {
        store: appStore,
        params: route.params,
        err: route.err
      })

      const routeHandler = React.createElement(Html, {
        html: ReactDOMServer.renderToString(routeComponent),
        clientConfig: makeClientConfig(),
        jsUrl: config.get('assets.urlPrefix')+'bundle.js',
        cssUrl: config.get('assets.compileAssets') ? config.get('assets.urlPrefix')+'style.css' : false,
        title: route.title,
        appplicationState: 'window.app=' + JSON.stringify(appStore.getState()),
        store: appStore,
        nonce: inlineScriptNonce
      })

      const renderedComponent = ReactDOMServer.renderToString(routeHandler)

      res.set('Content-Type', 'text/html')
      res.end('<!DOCTYPE html>' + renderedComponent)
      debug('Response sent')
    } else {
      route.handler(req, res, next, Object.assign({}, route.handlerOptions || {}))
    }
  }).catch((e) => {
    next(e)
  })
})

// Start Server
debug('Setting port')

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000)
  debug('Listening on port 3000')
} else {
// TODO: Refactor letsencrypt
  let greenlock = require('greenlock-express');
  greenlock.create({
    server: 'https://acme-v01.api.letsencrypt.org/directory',
    email: config.get('email.address'),
    agreeTos: true,
    approveDomains: [ config.get('domain')],
    app
  }).listen(80, 443)
  debug('Listening on '+config.get('baseUrl'))
}


