
// UTILITIES THAT NODE REALLY LIKES
require('dotenv').load();
var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');

// SETS UP THE EXPRESS / NODE CONNECTION
var app = express();

// CONNECTS OUR DATABASE
var db = require('./SERVERSIDE/models/db');



// NOT TECHNICALLY A NODE DEPENDENCY, BUT IT MAKES HEROKU HAPPIER
var favicon = require('serve-favicon');

// OPTIONAL PLUGINS FOR LOGGING
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// OPTIONAL SESSION-BASED AUTH
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');



// Webpack config to enable hot reloading
if (process.env.NODE_ENV === 'production') {
  console.log('****************************** RUNNING IN PRODUCTION MODE ******************************');

  app.use('/static', express.static(path.join(__dirname, './CLIENTSIDE/static')));
} else {

  // When not in production, enable hot reloading
  console.log('****************************** RUNNING IN DEV MODE ******************************');
  var chokidar = require('chokidar');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
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
app.use(express.static(path.join(__dirname, './CLIENTSIDE/public')));

// view engine setup
app.set('views', path.join(__dirname, './CLIENTSIDE/views'));
app.set('view engine', 'ejs');


// linking the favicon so Heroku isn't angry with us
app.use(favicon(path.join(__dirname, './CLIENTSIDE/public', 'favicon.ico')));


// Enable Morgan (logger)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// Passport (session-base login) setup
// WE DO NOT NEED THIS YET - MAY USE IT FOR REPORTING AUTHENTICATION
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

require('./SERVERSIDE/config/passport')(passport);


// routes ======================================================================
require('./SERVERSIDE/routes/users.js')(app, passport);

var newRouter = require('./SERVERSIDE/routes/routes.js')
app.use('/api', newRouter);

app.get('/sharkicorn', function(req, res){
  res.render('sharkicorn.ejs')
});

var templateRouter = require('./SERVERSIDE/routes/templateRoutes.js')
app.use('/templates', templateRouter);


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


module.exports = app;
