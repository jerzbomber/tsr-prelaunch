var express = require('express');
var expressWinston = require('express-winston');
var winston = require('winston');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var signup = require('./routes/signup');
var privacy = require('./routes/privacy');

var app = express();

// Too Verbose! Will blow up logs since
// requests are for every resource.

// app.use(expressWinston.logger({
//   transports: [
//     new (winston.transports.File) ({
//       filename: './data/requests.log',
//       level: 'info',
//       json: true,
//       timestamp: true
//     })
//   ]
// }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/privacy', privacy);
app.use('/signup', signup);

app.use(expressWinston.errorLogger({
  transports: [
    new (winston.transports.File) ({
      filename: './data/request-errors.log',
      level: 'error',
      json: true,
      timestamp: true
    })
  ]
}));

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

module.exports = app;
