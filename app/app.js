'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const applicant = require('./models/application');
const identity = require('./models/identity');

var routes = require('./routes');

var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var User  = require("./models/user");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var app = express();
var env = app.get('env');

app.use(require("express-session")({
  secret: "This is a random sentence",
  resave: false,
  saveUninitialized: false
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/sessions', sessions);

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
});

var databaseURI = 'mongodb://localhost/blockchainz-' + env;
mongoose.Promise = global.Promise;
mongoose
  .connect(databaseURI, {
   useMongoClient: true
 })
  .then(function() {
     console.log('connected to database ' + databaseURI);
   },
   function(err) {
     console.log('unable to establish a connection');
   }
 );

process.on('SIGINT', function() {
 mongoose.disconnect(function() {
   console.log('disconnected from database on app termination');
   process.exit(0);
 });
});

module.exports = app;
