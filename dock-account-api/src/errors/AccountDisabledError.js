class AccountDisabledError extends Error {  
    constructor () {
		super(`Can't block/unblock a disabled account`)

		this.name = this.constructor.name  
		Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AccountDisabledError  