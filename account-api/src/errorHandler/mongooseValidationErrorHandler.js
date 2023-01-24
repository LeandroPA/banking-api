const ValidationError = require('../errors/ValidationError');
const mongooseValidationError = require('mongoose').Error.ValidationError;

module.exports =  (err, req, res, next) => {

	if (err instanceof mongooseValidationError) {
		let errors = {};

		Object.keys(err.errors).forEach((key) => {
			errors[key] = err.errors[key].message;
		});		
        err = new ValidationError(errors);
    }

    next(err);
}