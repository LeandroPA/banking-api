const fetch = require('node-fetch');
const { startOfDay, endOfDay } = require('date-fns');
const Transaction = require('../models/transaction');
const DepositTransaction = require('../models/depositTransaction');
const WithdrawTransaction = require('../models/withdrawTransaction');
const TransferInTransaction = require('../models/transferInTransaction');
const TransferOutTransaction = require('../models/transferOutTransaction');
const WithdrawTransaction = require('../models/withdrawTransaction');
const CouponTransactionDTO = require('../dto/CouponTransactionDTO');
const HttpStatusCodeError = require('../errors/HttpStatusCodeError');
const AccountDisabledError = require('../errors/AccountDisabledError');
const AccountBlockedError = require('../errors/AccountBlockedError');
const TransactionLimitError = require('../errors/TransactionLimitError');
const InsufficientFundsError = require('../errors/InsufficientFundsError');
const ApiRestService = require('./apiRestService');

const { ACCOUNT_API_URL, CLIENT_API_URL } = process.env;

const accountApiRestService = new ApiRestService(ACCOUNT_API_URL);
const clientApiRestService = new ApiRestService(CLIENT_API_URL);

function handleApiResponseError(error) {
	if (error.status == 404 || error.status == 400) {

		let body = {
			errors: {
				details: 'Resource not found'
			}
		};

		throw new HttpStatusCodeError(404, 'Resource not found', body);

	} else {
		throw error;
	}
}

function handleAccountEnabledForTransact(account, transaction) {
	return Promise.resolve(account)
		.then(account => {
			if (!account.enabled) {
				throw new AccountDisabledError('account is disabledd for transactions');
			}

			if (account.blocked) {
				throw new AccountBlockedError();
			}

			return account;
		});
}

function handleTransactionLimits(account, transaction) {
	
	if (!account.limits || !account.limits[transaction.type] ||
		!('daily' in account.limits[transaction.type])) {
		return Promise.resolve(transaction);		
	}

	let limit = account.limits[transaction.type].daily;

	let statementQuery = {
		accountId: transaction.account,
		from: new Date(),
		to: new Date(),
		type: transaction.type
	}
	return exports.getStatement(statementQuery)
		.then(statement => {

			let futureTotalTransacted = statement.total.transacted + transaction.value;
			let futureTotalBalance = statement.total.balance + transaction.value;

			futureTotalTransacted *= futureTotalTransacted < 0 ? -1 : 1;

			if (futureTotalTransacted > limit) {
				throw new TransactionLimitError(`daily ${transaction.type} limit reached`);
			}

			if (futureTotalBalance < 0) {
				throw new InsufficientFundsError();
			}

			return transaction;
		})
}

exports.createTransferTransaction = (json) => {

	let transferOut = new TransferOutTransaction({value: json.value, account: json.account.from});
	let transferIn = new TransferInTransaction({value: json.value, account: json.account.to});

	transferOut.destination = transferIn;
	transferIn.source = transferOut;

	return this.createTransaction(transferOut)
		.then(() => this.createTransaction(transferIn));

}
exports.createDepositTransaction = (json) => {
	return this.createTransaction(new DepositTransaction(json));
}
exports.createWithdrawTransaction = (json) => {
	return this.createTransaction(new WithdrawTransaction(json));
}

exports.createTransaction = (transaction) => {

	return transaction.validate()
		.then(() => accountApiRestService.get(transaction.account))
		.catch(handleApiResponseError)
		.then(account => handleAccountEnabledForTransact(account, transaction))
		.then(account => handleTransactionLimits(account, transaction))
		.then(transaction => {
			transaction.date = new Date()
			return transaction.save();
		});
}

exports.getTransaction = (id) => {
	return Transaction.findById(id);
}

exports.getBalance = (params) => {

	const query = [
		{
			$match: {
				account: params.accountId,
				date: {
					$lte: endOfDay(params.date || new Date())
				}
			}
		},
		{
			$group: {
				_id: null,
				balance: {
					$sum: '$value'
				}
			}
		}
	];

	return Transaction.aggregate(query)
		.then(values=> {
			return {
				balance: values.reduce((s, t) => s + t.balance, 0)
			};
		});
}

exports.getStatement = (params) => {

	let query = {
		account: params.accountId
	};

	if (params.from) {
		query.date = {$gte: startOfDay(params.from), ...query.date};
	}
	if (params.to) {
		query.date = {$lte: endOfDay(params.to), ...query.date};
	}

	if (params.type) {
		query.type = params.type
	}

	let result = {
		total: {}
	};

	return Transaction.find(query)
		.then(transactions => {
			result.total.transacted = transactions.reduce((s, t) => s + t.value, 0);
			result.transactions = transactions;
		})
		.then(() => exports.getBalance({accountId: params.accountId, date: params.to}))
		.then(balance => {
			result.total.balance = balance.balance;
			return result;
		});
}

exports.getCoupon = (id) => {
	
	return exports.getTransaction(id)
		.then(async transaction => {

			let coupon = {};

			coupon.id = transaction.id;
			coupon.value = transaction.value;
			coupon.type = transaction.type;
			coupon.date = transaction.date;

			coupon.accountSource = await getAccountInfo(transaction.source);
			coupon.accountDestination = await getAccountInfo(transaction.destination);

			return new CouponTransactionDTO(coupon);
		})
}

async function getAccountInfo(account) {
	if (!account) {
		return Promise.resolve();
	}		

	account = await accountApiRestService.get(account);
	account.holder = await clientApiRestService.get(account.holder);

	return {
		id: account.id,
		agency: account.agency,
		number: account.number,
		documentNumber: account.holder.documentNumber
	}
}