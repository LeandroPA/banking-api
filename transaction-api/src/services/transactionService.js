const fetch = require('node-fetch');
const { startOfDay, endOfDay } = require('date-fns');
const Transaction = require('../models/transaction');
const DepositTransaction = require('../models/depositTransaction');
const WithdrawTransaction = require('../models/withdrawTransaction');
const TransferInTransaction = require('../models/transferInTransaction');
const TransferOutTransaction = require('../models/transferOutTransaction');
const CouponTransactionDTO = require('../dto/CouponTransactionDTO');
const accountApiRestService = require('./accountApiRestService');
const clientApiRestService = require('./clientApiRestService');

exports.createTransferTransaction = (json) => {

	let transferOut = new TransferOutTransaction({value: json.value, account: json.account.from});
	let transferIn = new TransferInTransaction({value: json.value, account: json.account.to});

	transferOut.receiver = transferIn;
	transferIn.sender = transferOut;

	return this.createTransaction(transferIn)
		.then(() => this.createTransaction(transferOut));
}

exports.createDepositTransaction = (json) => {
	return this.createTransaction(new DepositTransaction(json));
}

exports.createWithdrawTransaction = (json) => {
	return this.createTransaction(new WithdrawTransaction(json));
}

exports.createTransaction = (transaction) => {
	return transaction.save();
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