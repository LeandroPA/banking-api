class HttpStatusCodeError extends Error {  
    constructor (statusCode, message, body) {
		super(message)

		this.name = this.constructor.name  
		Error.captureStackTrace(this, this.constructor);  

		this.statusCode = statusCode >= 400 && statusCode <= 599 ? 
			statusCode : 500;
		this.body = body;
    }
  }
  
  module.exports = HttpStatusCodeError  