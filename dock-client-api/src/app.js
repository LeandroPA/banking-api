var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/person');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

require('./database');

app.use('/', indexRouter);
app.use('/person', usersRouter);

module.exports = app;
