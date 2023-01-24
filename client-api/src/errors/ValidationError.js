const HttpStatusCodeError = require('./HttpStatusCodeError')

class ValidationError extends HttpStatusCodeError {  
    constructor (errors) {
		super(400, 'Validation error', {errors: errors});

		this.name = this.constructor.name  
		Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = ValidationError  