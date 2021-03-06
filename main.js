'use strict';

// require('angular-dragula').globalPaths.push(__dirname + "/node_modules/");
// require('module').globalPaths.forEach(console.log.bind(console));
// console.log(module.paths.push(__dirname + '/node_modules'));

const electron = require('electron');
const app = electron.app;
// const app = require('app');
const BrowserWindow = require('browser-window');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//const routes = require('./routes/index');
const userRoute = require('./routes/users'); 
const clientRoute = require('./routes/clients'); 
const messageRoute = require('./routes/messages'); 
const appRoutes = require('./routes/app');
const expressApp = express();
const debug = require('debug')('express-test:server');
const http = require('http');
const port = normalizePort(process.env.PORT || '3000');
var server;

var mongoose = require('mongoose');
var connection = mongoose.connect('localhost:27017/electron-spa-angular2');



function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);

  mainWindow.loadURL('http://127.0.0.1:3000');
  //mainWindow.toggleDevTools();
}

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: false,
    nodeIntegration: true,
  	width: 1024,
  	height: 620
    // mainWindow = new BrowserWindow({width: 1024, height: 620});

  });

  // view engine setup
  //expressApp.set('views', path.join(__dirname, 'views'));
  expressApp.set('views', path.join(__dirname, 'views'));
  expressApp.set('view engine', 'hbs');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  expressApp.use(logger('dev'));
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({ extended: false }));
  expressApp.use(cookieParser());
  expressApp.use(express.static(path.join(__dirname, 'public')));
  //expressApp.use('/', routes);
  expressApp.set('port', port);

  expressApp.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

expressApp.use('/user', userRoute);
expressApp.use('/client', clientRoute);
//expressApp.use('/message', messageRoute);
expressApp.use('/', appRoutes);

expressApp.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });


  // expressApp.get('/', function(req,res) {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //       res.render('index');
  //   }
  // });

  // development error handler
  // will print stacktrace
  if (expressApp.get('env') === 'development') {
    expressApp.use(function(err, req, res, next) {
      res.status(err.status || 500);
      console.log(err);
      // res.render('error', {
      //   message: err.message,
      //   error: err
      // });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  expressApp.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    // res.render('error', {
    //   message: err.message,
    //   error: {}
    // });
  });

  server = http.createServer(expressApp);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  mainWindow.on('closed', function() {
    mainWindow = null;
    server.close();
  });
});

module.exports = expressApp;