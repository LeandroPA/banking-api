const transactionService = require('../services/transactionService');
const HttpStatusCodeError = require('../errors/HttpStatusCodeError')

const handleResourceResponse = (res, data) => {

	if (!data) {
		throw new HttpStatusCodeError(404, 'Not Found', null);
	}
	res.status(200).json(data);
};

exports.deposit = (req, res, next) => {

	transactionService.createDepositTransaction(req.body)
		.then(transaction => res.status(201).json(transaction))
		.catch(next);
}

exports.withdraw = (req, res, next) => {

	transactionService.createWithdrawTransaction(req.body)
		.then(transaction => res.status(201).json(transaction))
		.catch(next);
}

exports.get = (req, res, next) => {

	transactionService.getTransaction(req.params.id)
		.then(transaction => handleResourceResponse(res, transaction))
		.catch(next);
}

exports.getBalance = (req, res, next) => {

	transactionService.getBalance(req.params.id)
		.then(transaction => handleResourceResponse(res, transaction))
		.catch(next);
}

exports.getStatement = (req, res, next) => {

	transactionService.getTransaction(req.params.id)
		.then(transaction => handleResourceResponse(res, transaction))
		.catch(next);
}

exports.delete = (req, res, next) => {

	transactionService.deleteTransaction(req.params.id)
		.then(transaction => handleResourceResponse(res, transaction))
		.catch(next);
}