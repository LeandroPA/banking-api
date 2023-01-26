const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const csurf = require('csurf');
require('dotenv').config();

const routes = require('./routes/routes');
const errorHandlers = require('./errorHandler/errorHandler');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(routes);
app.use(errorHandlers);
app.use(helmet());
app.use(csurf());

require('./database');

module.exports = app;