const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const routes = require('./routes/routes');
const errorHandlers = require('./errorHandler/errorHandler');

// deepcode ignore UseCsurfForExpress: The app doesn't use cookies nor sessions.
const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(routes);
app.use(errorHandlers);
app.use(helmet());

require('./database');

module.exports = app;