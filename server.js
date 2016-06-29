require('dotenv').load();
var express = require('express');
var db = require('./models/db');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var morgan = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');

var session = require('express-session');

var app = express();



// Webpack config to enable hot reloading
if (process.env.NODE_ENV === 'production') {
  console.log('****************************** RUNNING IN PRODUCTION MODE ******************************');

  app.use('/static', express.static('static'));
} else {
  // When not in production, enable hot reloading

  console.log('****************************** RUNNING IN DEV MODE ******************************');
  var chokidar = require('chokidar');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  var watcher = chokidar.watch('server');
  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log('Clearing /server/ module cache from server');
      Object.keys(require.cache).forEach(function(id) {
        if (/\/server\//.test(id)) {
          delete require.cache[id];
        }
      });
    });
  });
}


// Allow access to the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// linking the favicon so Heroku isn't angry with us
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// Enable Morgan (logger)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// Passport (session-base login) setup
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(session({
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash());

require('./config/passport')(passport);


// routes ======================================================================
require('./routes/users.js')(app, passport);
var newRouter = require('./routes/routes.js')

app.use('/api', newRouter);

app.get('/sharkicorn', function(req, res){
  res.render('sharkicorn.ejs')
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var static_path = path.join(__dirname, '/');
var config = require('./config/serverConfig.js');


module.exports = app;
