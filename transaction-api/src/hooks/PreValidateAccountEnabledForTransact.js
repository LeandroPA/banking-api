const Hook = require('./Hook');
const AccountDisabledError = require('../errors/AccountDisabledError');
const AccountBlockedError = require('../errors/AccountBlockedError');

class PreValidateAccountEnabledForTransact extends Hook {

    hook(transaction) {
        if (!transaction.$account.enabled) {
            throw new AccountDisabledError('account is disabled for transactions');
        }

        if (transaction.$account.blocked) {
            throw new AccountBlockedError();
        }

        return transaction;
    }
}

module.exports = PreValidateAccountEnabledForTransact;