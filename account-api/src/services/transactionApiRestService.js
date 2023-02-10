const ApiRestService = require('./apiRestService');
const { TRANSACTION_API_URL } = process.env;

const apiRest = new ApiRestService(TRANSACTION_API_URL + '/transaction/');

apiRest.getBalance = function (id) {
    return apiRest.request(`account/${id}/balance`),then(response => response.json());
}

module.exports = apiRest;