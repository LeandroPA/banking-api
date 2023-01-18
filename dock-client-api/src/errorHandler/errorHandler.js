
const mongooseValidationErrorHandler = require('./mongooseValidationErrorHandler');
const duplicateKeyErrorHandler = require('./duplicateKeyErrorHandler');
const httpStatusCodeErrorHandler = require('./httpStatusCodeErrorHandler');

module.exports = [
    mongooseValidationErrorHandler,
    duplicateKeyErrorHandler,
    httpStatusCodeErrorHandler
];