const SimpleValidationError = require('./SimpleValidationError');

class InsufficientFundsError extends SimpleValidationError {  
    constructor(message = 'insufficient funds for transaction') {
		super(message)

		this.name = this.constructor.name  
		Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = InsufficientFundsError;