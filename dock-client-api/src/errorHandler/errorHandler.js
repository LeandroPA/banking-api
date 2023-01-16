
const validationErrorHandler = require('./validationErrorHandler');
const duplicateKeyErrorHandler = require('./duplicateKeyErrorHandler');
const httpStatusCodeErrorHandler = require('./httpStatusCodeErrorHandler');

module.exports = [
    validationErrorHandler,
    duplicateKeyErrorHandler,
    httpStatusCodeErrorHandler
];