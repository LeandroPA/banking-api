
const mongooseValidationErrorHandler = require('./mongooseValidationErrorHandler');
const duplicateKeyErrorHandler = require('./duplicateKeyErrorHandler');
const simpleValidationErrorHandler = require('./simpleValidationErrorHandler');
const httpStatusCodeErrorHandler = require('./httpStatusCodeErrorHandler');

module.exports = [
    mongooseValidationErrorHandler,
    duplicateKeyErrorHandler,
    simpleValidationErrorHandler,
    httpStatusCodeErrorHandler
];