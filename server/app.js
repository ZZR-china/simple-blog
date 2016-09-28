var express = require('express');
var compression = require('compression');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('../models/connect');

var api = require('../routes/api');
var api1 = require('../routes/api01');
var AV = require('leanengine');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../'));
app.set('view engine', 'jade');

// 加载云函数定义
require('./cloud');
// 加载云引擎中间件
app.use(AV.express());
app.use(compression());

//connect mongoose
var db = mongoose.connection;
db.on('error', function() {
    console.log('error')
})
db.once('open', function() {
    console.log('opened');
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, '../public')));


app.use('/', api);
app.use(function(req,res,next){
  res.set({
      'Access-Control-Allow-Origin': '*',
    });
  next();
});
app.use('/api/v1', api1);




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
        res.send(err);
    });
}

module.exports = app;
