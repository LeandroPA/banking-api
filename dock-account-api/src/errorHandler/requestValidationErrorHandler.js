const HttpStatusCodeError = require('../errors/HttpStatusCodeError');
const { validationResult } = require('express-validator');

const handleValidationResult = (errors) => {

	if (!errors.isEmpty()) {

		let body = {
			errors: errors.formatWith(error => {return error.msg}).mapped()
		}

		throw new HttpStatusCodeError(400, 'Validation error', body);
	} 
}

const validationMiddleware = (req, res, next, validations) => {

	Promise.all(validations.map(validation => validation.run(req)))
		.then(() => validationResult(req))
		.then(handleValidationResult)
		.then(next)
		.catch(next);
};


module.exports = (...validations) => {
	return (req, res, next) => 
		validationMiddleware(req, res, next, validations);
};