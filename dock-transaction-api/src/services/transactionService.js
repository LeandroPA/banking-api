const fetch = require('node-fetch');
const Transaction = require('../models/transaction');
const DepositTransaction = require('../models/depositTransaction');
const WithdrawTransaction = require('../models/withdrawTransaction');
const HttpStatusCodeError = require('../errors/HttpStatusCodeError');
const AccountDisabledError = require('../errors/AccountDisabledError');

const ACCOUNT_API_URL = process.env.DOCK_ACCOUNT_API_URL;

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


exports.createDepositTransaction = (json) => {	
	return this.createTransaction(new DepositTransaction(json));
}
exports.createWithdrawTransaction = (json) => {	
	return this.createTransaction(new WithdrawTransaction(json));
}

exports.createTransaction = (transaction) => {	
	return fetch(`${ACCOUNT_API_URL}/account/${transaction.account}`)
		.catch(handleApiResponseError)
		.then(handleApiResponseError)
		.then(response => response.json())
		.then(async account => {
			transaction.account = account.id;
			return transaction;
		})
		.then(this.getBalance)
		.then(balance => {
			return transaction;
		})
		// .then(transaction => new Transaction(transaction))
		.then(transaction => transaction.save());
}

exports.getTransaction = (id) => {
	return Transaction.findById(id);
}

exports.getBalance = (accountId) => {

	const query = [{
		$match: {
			account: accountId,
		}
	},
	{
		$group: {
			_id: null,
			balance: {
				$sum: "$value"
			}
		}
	}];

	const sumBalanceTransactions = (sum, value) => {
		return sum + (value.balance)
	};

	return Transaction.aggregate(query)
		.then(values=> {
			return {
				balance: values.reduce(sumBalanceTransactions, 0)
			};
		})
}

exports.deleteTransaction = (id) => {
	return Transaction.findByIdAndDelete(id);
}