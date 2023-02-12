const Account = require('../models/account');
const AccountDisabledError = require('../errors/AccountDisabledError');
const AccountBlockedError = require('../errors/AccountBlockedError');

exports.createAccount = (json) => {	
	return new Account(json).save();
}

exports.getAccount = (id) => {
	return Account.findOneByIdOrAgencyAndNumber(id);
}

exports.blockAccount = (id, status) => {
	return exports.getAccount(id)
		.then(account => {
			if (!account) {
				return account;
			}
			if (!account.enabled) {
				throw new AccountDisabledError(`Can't ${status ? 'block' : 'unblock'} a disabled account`);
			}
			if (account.blocked == status) {
				throw new AccountBlockedError(`Account already ${status ? 'blocked' : 'unblocked'}`);
			}
			account.blocked = status;
			return account.save();
		});
}

exports.disableAccount = (id) => {
	return exports.getAccount(id)
		.then(account => {
			if (!account) {
				return account;
			}
			if (!account.enabled) {
				throw new AccountDisabledError(`Account already disabled`);
			}
			account.enabled = false;
			return account.save();
		});
}