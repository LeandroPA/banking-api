const SimpleValidationError = require('./SimpleValidationError');
 
class AccountDisabledError extends SimpleValidationError {  
	constructor(message = 'account is disabled for transactions') {
		super(message)

		this.name = this.constructor.name  
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = AccountDisabledError  