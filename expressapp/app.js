var createError = require('http-errors');
var express = require('express');
var cors = require("cors")
var app = express();
app.use(cors());
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var paymentsRouter = require('./routes/payments');
var xeroRouter = require('./routes/xero')
const { env } = require('process');
const { Console } = require('console');

const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync('./security/cert.key','utf8');
const certificate = fs.readFileSync('./security/cert.pem','utf8');
const credentials = {
 key: privateKey,
 cert: certificate
};





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(session({
	secret: 'something crazy',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false },
}));
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/payments', paymentsRouter);
app.use('/xero', xeroRouter);

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

//const server = https.createServer(credentials,app);
//server.listen(443); 

module.exports = app;
