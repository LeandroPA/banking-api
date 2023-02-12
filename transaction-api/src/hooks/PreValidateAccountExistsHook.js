const ApiRestRequestHook = require('./ApiRestRequestHook');
const accountApiRestService = require('../services/accountApiRestService');

class PreValidateAccountExistsHook extends ApiRestRequestHook {

    constructor() {
        super(accountApiRestService, 'account');
    }

}

module.exports = PreValidateAccountExistsHook;