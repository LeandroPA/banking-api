const ApiRestService = require('./apiRestService');
const { TRANSACTION_API_URL } = process.env;
class TransactionApiRestService extends ApiRestService {

    constructor() {
        super(TRANSACTION_API_URL + '/transaction/');
    }

    getBalance(id) {
        return this.request(`account/${id}/balance`).then(response => response.json());
    }
}

module.exports = new TransactionApiRestService();