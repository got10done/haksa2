var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pro', require('./routes/professors')); //주소와 js를 연결
app.use('/stu', require('./routes/students'));
app.use('/cou', require('./routes/courses'));
app.use('/enroll', require('./routes/enrollments'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

//데이터베이스 접속
var db = require('./db'); //현재 파일이 있는 위치에(./) 있는 db파일과 연결
db.connect(function(err){
 if(err){
 console.log('Unable to connect to MySQL.');
 process.exit(1);
 }
});
module.exports = app;
