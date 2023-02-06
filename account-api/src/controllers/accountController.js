const accountService = require('../services/accountService');
const HttpStatusCodeError = require('../errors/HttpStatusCodeError');
const NewAccountDto = require('../dto/NewAccountDto');

const handleResourceResponse = (res, data) => {

	if (!data) {
		throw new HttpStatusCodeError(404, 'Not Found', null);
	}
	res.status(200).json(data);
};

exports.create = (req, res, next) => {
	/*
		#swagger.operationId = 'createAccount'
		#swagger.tags = ['account-api']
		#swagger.summary = 'Create an account'
		#swagger.description = 'Endpoint for account creation.'
		#swagger.produces = ['application/json']
		#swagger.requestBody = {
			required: true,
			description: 'A valid document number of physical person (Brazil CPF)',			
			content: {
				'application/json': {
					schema: { $ref: '#/components/schemas/New Account' },
				}
			}
		}
	*/
	accountService.createAccount(new NewAccountDto(req.body))
		// #swagger.responses[201] = { $ref: '#/components/responses/AccountCreated'}
		.then(account => res.status(201).json(account)) 
		// #swagger.responses[400] = { $ref: '#/components/responses/HolderIsRequired'}
		// #swagger.responses[404] = { $ref: '#/components/responses/HolderNotFound'}
		.catch(next);
}

exports.get = (req, res, next) => {
	/*
		#swagger.operationId = 'getAccount'
		#swagger.tags = ['account-api']
		#swagger.summary = 'Get an account'
		#swagger.description = 'Some description...'
		#swagger.produces = ['application/json']
		#swagger.parameters['id'] = {
			"in": "path",
			"required": true,
			"description": "The a id of the account. It may be the field <code>${account.id}</code> or <code>${account.agency}-${account.number}</code>",
			"schema": '63cc9f72a23faefce2e1e80d'
		}
	*/
	accountService.getAccount(req.params.id)
		// #swagger.responses[200] = { $ref: '#/components/responses/GetAccount'}
		.then(account => handleResourceResponse(res, account))
		// #swagger.responses[400] = { $ref: '#/components/responses/AccountInvalidId'}
		// #swagger.responses[404] = { $ref: '#/components/responses/NotFound'}	
		.catch(next);

}

exports.block = (req, res, next) => {
	/*
		#swagger.operationId = 'blockAccount'
		#swagger.tags = ['account-api']
		#swagger.summary = 'Block an account'
		#swagger.description = 'Temporary block the account to prevent making transations.'
		#swagger.produces = ['application/json']
		#swagger.parameters['id'] = {
			"name": id
			"in": "path",
			"description": "The a id of the account. It may be the field <code>${account.id}</code> or <code>${account.agency}-${account.number}</code>",
			"schema": '63cc9f72a23faefce2e1e80d'
		}
	*/
	accountService.blockAccount(req.params.id, true)
		// #swagger.responses[200] = { $ref: '#/components/responses/GetAccount'}
		.then(account => handleResourceResponse(res, account))
		// #swagger.responses[400] = { $ref: '#/components/responses/BadRequestBlockAccount'}
		// #swagger.responses[404] = { $ref: '#/components/responses/NotFound'}	
		.catch(next);
}

exports.unblock = (req, res, next) => {
	/*
		#swagger.operationId = 'unblockAccount'
		#swagger.tags = ['account-api']
		#swagger.summary = 'Unblock an account'
		#swagger.description = 'Remove temporary block that prevents making transations.'
		#swagger.produces = ['application/json']
		#swagger.parameters['id'] = {
			"name": id
			"in": "path",
			"description": "The a id of the account. It may be the field <code>${account.id}</code> or <code>${account.agency}-${account.number}</code>",
			"schema": '63cc9f72a23faefce2e1e80d'
		}
	*/
	accountService.blockAccount(req.params.id, false)
		// #swagger.responses[200] = { $ref: '#/components/responses/GetAccount'}
		.then(account => handleResourceResponse(res, account))
		// #swagger.responses[400] = { $ref: '#/components/responses/BadRequestUnblockAccount'}
		// #swagger.responses[404] = { $ref: '#/components/responses/NotFound'}	
		.catch(next);
}

exports.disable = (req, res, next) => {
	/*
		#swagger.operationId = 'disableAccount'
		#swagger.tags = ['account-api']
		#swagger.summary = 'Disable an account'
		#swagger.description = 'Disable an account permanently.'
		#swagger.produces = ['application/json']
		#swagger.parameters['id'] = {
			"name": id
			"in": "path",
			"description": "The a id of the account. It may be the field <code>${account.id}</code> or <code>${account.agency}-${account.number}</code>",
			"schema": '63cc9f72a23faefce2e1e80d'
		}
	*/
	accountService.disableAccount(req.params.id)
		// #swagger.responses[200] = { $ref: '#/components/responses/GetAccount'}
		.then(account => handleResourceResponse(res, account))
		// #swagger.responses[400] = { $ref: '#/components/responses/BadRequestDisableAccount'}
		// #swagger.responses[404] = { $ref: '#/components/responses/NotFound'}	
		.catch(next);
}