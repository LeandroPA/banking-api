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
					schema: { $ref: '#/components/schemas/New Transaction' }
				}
			}
		}
	*/
	transactionService.createDepositTransaction(req.body)
		// #swagger.responses[201] = { $ref: '#/components/responses/DepositTransaction'}
		.then(transaction => res.status(201).json(transaction))
		// #swagger.responses[400] = { $ref: '#/components/responses/BadRequestDepositTransaction'}
		// #swagger.responses[404] = { $ref: '#/components/responses/AccountNotFound'}
		.catch(next);
}

exports.withdraw = (req, res, next) => {

	/*
		#swagger.operationId = 'withdraw'
		#swagger.tags = ['transaction-api']
		#swagger.summary = 'Create a withdraw transaction'
		#swagger.description = 'Endpoint to create a withdraw transaction.'
		#swagger.produces = ['application/json']
		#swagger.requestBody = {
			required: true,
			description: '',			
			content: {
				'application/json': {
					schema: { $ref: '#/components/schemas/New Transaction' }
				}
			}
		}
	*/
	transactionService.createWithdrawTransaction(req.body)
		// #swagger.responses[201] = { $ref: '#/components/responses/WithdrawTransaction'}
		.then(transaction => res.status(201).json(transaction))
		// #swagger.responses[400] = { $ref: '#/components/responses/BadRequestWithdrawTransaction'}
		// #swagger.responses[404] = { $ref: '#/components/responses/AccountNotFound'}
		.catch(next);
}

exports.transfer = (req, res, next) => {

	/*
		#swagger.operationId = 'transfer'
		#swagger.tags = ['transaction-api']
		#swagger.summary = 'Create a transfer transaction'
		#swagger.description = 'Endpoint to create a transfer transaction.'
		#swagger.produces = ['application/json']
		#swagger.requestBody = {
			required: true,
			description: '',			
			content: {
				'application/json': {
					schema: { $ref: '#/components/schemas/New Transaction' }
				}
			}
		}
	*/
	transactionService.createTransferTransaction(req.body)
		// #swagger.responses[201] = { $ref: '#/components/responses/WithdrawTransaction'}
		.then(transaction => res.status(201).json(transaction))
		// #swagger.responses[400] = { $ref: '#/components/responses/BadRequestWithdrawTransaction'}
		// #swagger.responses[404] = { $ref: '#/components/responses/AccountNotFound'}
		.catch(next);
}

exports.get = (req, res, next) => {

	/*
		#swagger.operationId = 'getTransaction'
		#swagger.tags = ['transaction-api']
		#swagger.summary = 'Get a transaction'
		#swagger.description = 'Endpoint to get a transaction.'
		#swagger.produces = ['application/json']
		#swagger.parameters['id'] = {
			in: 'path',
			required: true,
			description: 'The id of the transaction.'
		}
	*/
	transactionService.getTransaction(req.params.id)
		// #swagger.responses[200] = { $ref: '#/components/responses/Transaction'}
		.then(transaction => handleResourceResponse(res, transaction))
		// #swagger.responses[400] = { $ref: '#/components/responses/InvalidId'}
		// #swagger.responses[404] = { $ref: '#/components/responses/NotFound'}
		.catch(next);
}

exports.getCoupon = (req, res, next) => {

	/*
		#swagger.operationId = 'getCoupon'
		#swagger.tags = ['transaction-api']
		#swagger.summary = 'Get a coupon of a transaction'
		#swagger.description = 'Endpoint to get a coupon of a transaction.'
		#swagger.produces = ['application/json']
		#swagger.parameters['id'] = {
			in: 'path',
			required: true,
			description: 'The id of the transaction.'
		}
		#swagger.responses[200] = { $ref: '#/components/responses/CouponTransaction'}
		#swagger.responses[400] = { $ref: '#/components/responses/InvalidId'}
		#swagger.responses[404] = { $ref: '#/components/responses/NotFound'}
	*/
	transactionService.getCoupon(req.params.id)
		.then(coupon => {
			res.format({
				html: () => res.render('coupon_transaction', { coupon: coupon.toLocale(req) } ),
				json: () => handleResourceResponse(res, coupon),
			});
		})
		.catch(next);
}

exports.getBalance = (req, res, next) => {
	/*
		#swagger.operationId = 'getBalance'
		#swagger.tags = ['transaction-api']
		#swagger.summary = 'Get the balance of the account'
		#swagger.description = 'Endpoint to get the balance of the account.'
		#swagger.produces = ['application/json']
		#swagger.parameters['id'] = {
			in: 'path',
			required: true,
			description: 'The id of the account.'
		}
	*/
	transactionService.getBalance({accountId: req.params.id})
		// #swagger.responses[200] = { $ref: '#/components/responses/Balance'}
		.then(transaction => handleResourceResponse(res, transaction))
		// #swagger.responses[400] = { $ref: '#/components/responses/InvalidId'}
		.catch(next);
}

exports.getStatement = (req, res, next) => {
	/*
		#swagger.operationId = 'getStatement'
		#swagger.tags = ['transaction-api']
		#swagger.summary = 'Get the balance of the account'
		#swagger.description = 'Endpoint to get the balance of the account.'
		#swagger.produces = ['application/json']
		#swagger.parameters['id'] = {
			in: 'path',
			required: true,
			description: 'The id of the transaction.'
		}
		#swagger.parameters['from'] = {
			in: 'query',
			format: 'date',
			required: false,
			description: 'The id of the transaction.'
		}
		#swagger.parameters['to'] = {
			in: 'query',
			format: 'date',
			required: false,
			description: 'The id of the transaction.'
		}
	*/
	let params = {
		accountId: req.params.id,
		from: req.query.from && new Date(req.query.from),
		to: req.query.to && new Date(req.query.to),
	}

	transactionService.getStatement(params)
		.then(transaction => handleResourceResponse(res, transaction))
		.catch(next);
}