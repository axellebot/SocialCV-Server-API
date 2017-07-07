var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routeIndex = require('./routes');
var routeComputingTags = require('./routes/computingTags');
var routeEducations = require('./routes/educations');
var routeEntities = require('./routes/entities');
var routeExperiences = require('./routes/experiences');
var routeFrameworks = require('./routes/frameworks');
var routeInterests = require('./routes/interests');
var routeLanguages = require('./routes/languages');
var routeLinks = require('./routes/links');
var routeLinkTags = require('./routes/linkTags');
var routeOperatingSystems = require('./routes/operatingSystems');
var routeProjects = require('./routes/projects');
var routeSoftwareFrameworks = require('./routes/softwareFrameworks');
var routeSoftwares = require('./routes/softwares');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', routeIndex);
app.use('/computingTags', routeComputingTags);
app.use('/educations', routeEducations);
app.use('/entities', routeEntities);
app.use('/experiences', routeExperiences);
app.use('/frameworks', routeFrameworks);
app.use('/interests', routeInterests);
app.use('/languages', routeLanguages);
app.use('/links', routeLinks);
app.use('/linkTags', routeLinkTags);
app.use('/operatingSystems', routeOperatingSystems);
app.use('/projects', routeProjects);
app.use('/softwareFrameworks', routeSoftwareFrameworks);
app.use('/softwares', routeSoftwares);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
});

module.exports = app;
