const express = require('express');
const logger = require('morgan');
require('dotenv').config()

const routes = require('./routes/routes');
const errorHandlers = require('./errorHandler/errorHandler');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(routes);
app.use(errorHandlers);

require('./database');

module.exports = app;
