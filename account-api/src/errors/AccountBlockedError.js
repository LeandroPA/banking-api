const SimpleValidationError = require('./SimpleValidationError');

class AccountBlockedError extends SimpleValidationError {  
    constructor(message = 'account is blocked for transactions') {
		super(message)

		this.name = this.constructor.name  
		Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AccountBlockedError;