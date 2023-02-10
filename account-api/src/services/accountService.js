const fetch = require('node-fetch');
const Account = require('../models/account');
const HttpStatusCodeError = require('../errors/HttpStatusCodeError');
const AccountDisabledError = require('../errors/AccountDisabledError');
const AccountBlockedError = require('../errors/AccountBlockedError');

function handleApiResponseError(response) {

	let body = {
		errors: {}
	};

	if (response.status == 404) {
		body.errors.holder = 'Holder not found';
		throw new HttpStatusCodeError(404, 'Holder not found', body);
	}

	if (response.status >= 500 || response instanceof fetch.FetchError) {
		body.errors.details = 'Internal API error';
		throw new HttpStatusCodeError(500, 'Internal API error', body);
	}

	if (response instanceof Error) {
		throw response; //Pass to the next catch
	}

	return response;
}

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