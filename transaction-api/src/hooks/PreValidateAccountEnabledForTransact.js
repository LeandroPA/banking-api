const Hook = require('./Hook');
const AccountDisabledError = require('../errors/AccountDisabledError');
const AccountBlockedError = require('../errors/AccountBlockedError');

class PreValidateAccountEnabledForTransact extends Hook {

    async hook(transaction) {

        let account = await transaction.$account;

        if (!account.enabled) {
            throw new AccountDisabledError('account is disabled for transactions');
        }

        if (account.blocked) {
            throw new AccountBlockedError();
        }

        return transaction;
    }
}

module.exports = PreValidateAccountEnabledForTransact;