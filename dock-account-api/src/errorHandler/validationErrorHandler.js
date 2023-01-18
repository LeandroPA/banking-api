const HttpStatusCodeError = require('../errors/HttpStatusCodeError');

module.exports =  (err, req, res, next) => {

	if (err && err.name == 'ValidationError' ) {
		let body = {
            errors: {}
        };
		Object.keys(err.errors).forEach((key) => {
			body.errors[key] = err.errors[key].message;
		});		
        err = new HttpStatusCodeError(400, 'Validation error', body);
    }

    next(err);
  }