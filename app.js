require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var app = express();
app.use(session({
  secret:process.env.HASH_CODE,
  resave:false,
  saveUninitialized:false,
  
  // cookie:{
  //   secure:true,
  //   maxAge:300000,
  //   sameSite:'none'
    
  // }
}))
var path = require('path');

// const liveReload =require('connect-livereload');
// app.set("trust proxy",1)


// app.use(liveReload())
var logger = require('morgan');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let homeRouter = require('./routes/home');
let regRoutes =require('./routes/register')
const loginRoutes =require('./routes/login');
const logoutRoutes = require('./routes/logout');

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/users', usersRouter);
app.use('/home',homeRouter);
app.use('/login',loginRoutes);
app.use('/admin', indexRouter);
app.use('/register',regRoutes);
app.use('/logout',logoutRoutes)

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

module.exports = app;
