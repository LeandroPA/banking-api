const transactionService = require('../services/transactionService');
const HttpStatusCodeError = require('../errors/HttpStatusCodeError')

const handleResourceResponse = (res, data) => {

	if (!data) {
		throw new HttpStatusCodeError(404, 'Not Found', null);
	}
	res.status(200).json(data);
};

exports.deposit = (req, res, next) => {

	/*
		#swagger.operationId = 'deposit'
		#swagger.tags = ['transaction-api']
		#swagger.summary = 'Create a deposit transaction'
		#swagger.description = 'Endpoint to create a deposit transaction.'
		#swagger.produces = ['application/json']
		#swagger.requestBody = {
			required: true,
			description: '',			
			content: {
				'application/json': {
					schema: { $ref: '#/components/schemas/New Transaction' },
				}
			}
		}
	*/
	transactionService.createDepositTransaction(req.body)
		// #swagger.responses[201] = { $ref: '#/components/responses/DepositTransaction'}
		.then(transaction => res.status(201).json(transaction))
		// #swagger.responses[400] = { $ref: '#/components/responses/BadRequestDepositTransaction'}
		// #swagger.responses[404] = { $ref: '#/components/responses/NotFound'}
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

	transactionService.getBalance({accountId: req.params.id})
		.then(transaction => handleResourceResponse(res, transaction))
		.catch(next);
}

exports.getStatement = (req, res, next) => {

	let params = {
		accountId: req.params.id,
		from: req.query.from && new Date(req.query.from),
		to: req.query.to && new Date(req.query.to),
	}

	transactionService.getStatement(params)
		.then(transaction => handleResourceResponse(res, transaction))
		.catch(next);
}