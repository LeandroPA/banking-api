const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const path = require('path');
const hbs = require('hbs');
require('dotenv').config();

const localeService = require('./services/localeService');
const routes = require('./routes/routes');
const errorHandlers = require('./errorHandler/errorHandler');

hbs.registerHelper('__', function (...args) {
    return localeService.i18nProvider.__.apply(this, arguments); 
});
hbs.registerHelper('__n', function () {
    return localeService.i18nProvider.__n.apply(this, arguments); 
});

// deepcode ignore UseCsurfForExpress: The app doesn't use cookier nor sessions.
const app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', path.join(__dirname, 'views'));
app.use(localeService.i18nProvider.init);
app.use(logger('dev'));
app.use(express.json());

app.use(routes);
app.use(errorHandlers);
app.use(helmet());

require('./database');

module.exports = app;