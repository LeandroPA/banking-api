const fetch = require('node-fetch');
const Transaction = require('../models/transaction');
const { getSequencial } = require('./sequencialGeneratorService');
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


exports.createTransaction = (json) => {	
	return fetch(`${ACCOUNT_API_URL}/account/${json.account}`)
		.catch(handleApiResponseError)
		.then(handleApiResponseError)
		.then(response => response.json())
		.then(this.getBalance)
		.then(async account => {
			json.account = account.id;
			console.log(account.balance)
			json.type = json.value > 0 ? 'deposit' : 'withdraw';
			return json;
		})
		.then(transaction => new Transaction(transaction))
		.then(transaction => transaction.save());
}

exports.getTransaction = (id) => {
	return Transaction.findById(id);
}

exports.getBalance = (account) => {

	const query = [{
		$match: {
			account: account.id,
		}
	  },
	  {
		$group: {
			_id: null,
			balance: {
				$sum: "$value"
			}
		}
	  },
	  {"$unset": ["_id"]}
	];

	return Transaction.aggregate(query)
		.then(value=> {
			console.info('Value: ', value);
			account.balance.value = value && value[0].balance || 0
			return account;
		})
}

exports.deleteTransaction = (id) => {
	return Transaction.findByIdAndDelete(id);
}