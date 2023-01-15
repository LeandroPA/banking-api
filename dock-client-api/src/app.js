var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

const routes = require('./routes/routes');
const validationErrorHandler = require('./errorHandler/validationErrorHandler');

var app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(routes);
app.use(validationErrorHandler);

require('./database');

module.exports = app;
