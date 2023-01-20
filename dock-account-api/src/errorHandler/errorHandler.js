
const mongooseValidationErrorHandler = require('./mongooseValidationErrorHandler');
const duplicateKeyErrorHandler = require('./duplicateKeyErrorHandler');
const accountDisabledErrorHandler = require('./accountDisabledErrorHandler');
const httpStatusCodeErrorHandler = require('./httpStatusCodeErrorHandler');

module.exports = [
    mongooseValidationErrorHandler,
    duplicateKeyErrorHandler,
    accountDisabledErrorHandler,
    httpStatusCodeErrorHandler
];