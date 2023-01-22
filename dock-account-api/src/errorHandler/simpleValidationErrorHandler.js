const SimpleValidationError = require('../errors/SimpleValidationError');
const ValidationError = require('../errors/ValidationError');


module.exports =  (err, req, res, next) => {

	if (err instanceof SimpleValidationError) {	
		err = new ValidationError({details: err.message});
	}

	next(err);
}