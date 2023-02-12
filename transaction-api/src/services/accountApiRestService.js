const ApiRestService = require('./apiRestService');
const { ACCOUNT_API_URL } = process.env;

class AccountApiRestService extends ApiRestService {

    constructor() {
        super(ACCOUNT_API_URL);
    }
}

module.exports = new AccountApiRestService();