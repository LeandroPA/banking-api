const ApiRestService = require('./apiRestService');
const { CLIENT_API_URL } = process.env;

class ClientApiRestService extends ApiRestService {

    constructor() {
        super(CLIENT_API_URL);
    }
}

module.exports = new ClientApiRestService();