const ApiRestRequestHook = require('./ApiRestRequestHook');
const accountApiRestService = require('../services/accountApiRestService');

class PreValidateAccountExistsHook extends ApiRestRequestHook {

    hook(document) {
        return super.hook(document, accountApiRestService, 'account');
    }
}

module.exports = PreValidateAccountExistsHook;