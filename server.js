"use strict";

// Requires Packages
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Config
const config = require("./config");

// Constants
const messages = require('./constants/messages');
const statuses = require('./constants/statuses');
const models = require('./constants/models');
const roles = require('./constants/roles');
const parameters = require('./constants/parameters');
const paths = require('./constants/paths');

// Errors
const NotFoundError = require('./errors/NotFoundError')

// Routers
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Add favicon in public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(morgan('dev'));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: false
})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// In production
if (app.get('env') === 'production') {
  // Force HTTPS in production
  app.use((req, res, next) => {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}

//Authorize CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Import routes to be served
require('./routes')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new NotFoundError());
});

// error handler
app.use((err, req, res, next) => {
  if(req.app.get('env') === 'development' ){
    console.error(err);
  }
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res
    .status(err.status || statuses.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .json({
      error: true,
      message: err.message || messages.MESSAGE_ERROR_APP
    });
  next();
});

module.exports = app;