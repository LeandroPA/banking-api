const HttpStatusCodeError = require('../errors/HttpStatusCodeError');

module.exports =  (err, req, res, next) => {

	if (err && err instanceof HttpStatusCodeError) {
		res.status(err.statusCode);
		err.body ? res.json(body) : res.end;
	} else {
		next(err);
	}
}  