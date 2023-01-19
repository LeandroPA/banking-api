const HttpStatusCodeError = require('../errors/HttpStatusCodeError');

module.exports =  (err, req, res, next) => {

	if (err && err instanceof HttpStatusCodeError) {
		res.status(err.statusCode).json(err.body || err.message);
	} else {
		next(err);
	}
}  