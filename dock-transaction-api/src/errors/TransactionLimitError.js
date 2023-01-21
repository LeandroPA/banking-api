const SimpleValidationError = require('./SimpleValidationError');

class TransactionLimitError extends SimpleValidationError {  
    constructor(message = 'transaction limit reached') {
		super(message)

		this.name = this.constructor.name  
		Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = TransactionLimitError;