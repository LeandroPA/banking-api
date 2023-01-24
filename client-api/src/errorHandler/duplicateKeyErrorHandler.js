const HttpStatusCodeError = require('../errors/HttpStatusCodeError');

module.exports =  (err, req, res, next) => {

	if (err && err.name == 'MongoServerError' && err.code === 11000 ) {
		let body = {
            errors: {}
        };
		Object.keys(err.keyValue).forEach((key) => {
			body.errors[key] = `Duplicate value for ${key}`;
        });
        err = new HttpStatusCodeError(409, 'Duplicate key error', body);
    }

    next(err);
}