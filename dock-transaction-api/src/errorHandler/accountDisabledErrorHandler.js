const AccountDisabledError = require('../errors/AccountDisabledError');
const ValidationError = require('../errors/ValidationError');


module.exports =  (err, req, res, next) => {

	if (err instanceof AccountDisabledError) {	
        err = new ValidationError({details: err.message});
    }

    next(err);
}