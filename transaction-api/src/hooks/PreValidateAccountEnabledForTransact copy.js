const Hook = require('./Hook');
const AccountDisabledError = require('../errors/AccountDisabledError');
const AccountBlockedError = require('../errors/AccountBlockedError');

class PreValidateAccountEnabledForTransact extends Hook {

    hook(document) {
        if (!account.enabled) {
            throw new AccountDisabledError('account is disabled for transactions');
        }

        if (account.blocked) {
            throw new AccountBlockedError();
        }

        return account;
    }
}

module.exports = PreValidateAccountEnabledForTransact;