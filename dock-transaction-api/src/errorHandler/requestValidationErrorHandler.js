const ValidationError = require('../errors/ValidationError');
const { validationResult } = require('express-validator');

const handleValidationResult = (errors) => {

	if (!errors.isEmpty()) {
		throw new ValidationError(errors.formatWith(error => {return error.msg}).mapped());
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