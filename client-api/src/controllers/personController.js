const HttpStatusCodeError = require('../errors/HttpStatusCodeError');
const personService = require('../services/personService');

const handleResourceResponse = (res, data) => {

	if (!data) {
		throw new HttpStatusCodeError(404, 'Not Found', null);
	}
	res.status(200).json(data);
};

exports.create = (req, res, next) => {
	/*
		#swagger.operationId = 'createPerson'
		#swagger.tags = ['client-api']
		#swagger.summary = 'Create a person '
		#swagger.description = 'Endpoint for person creation.'
		#swagger.produces = ['application/json']
		#swagger.requestBody = {
			required: true,
			description: 'A new physical person creation. Requires <code>fullname</code> and <code>documentNumber</code> (Brazil CPF format).',			
			content: {
				'application/json': {
					schema: { $ref: '#/components/schemas/New Person' },
				}
			}
		}
	*/
	personService.createPerson(req.body)
		// #swagger.responses[201] = { $ref: '#/components/responses/PersonCreated'}
		.then(person => res.status(201).json(person))
		// #swagger.responses[400] = { $ref: '#/components/responses/NewPersonValidationCheck'}
		// #swagger.responses[409] = { $ref: '#/components/responses/DuplicateDocumentNumber'}
		.catch(next);
}
exports.get = (req, res, next) => {
	/*
		#swagger.operationId = 'getPerson'
		#swagger.tags = ['client-api']
		#swagger.summary = 'Get a person '
		#swagger.description = 'Endpoint to get a person.'
		#swagger.produces = ['application/json']
		#swagger.parameters['id'] = {
			in: 'path',
			required: true,
			description: 'The id of the person. It can be the field <code>${person.id}</code> or <code>${person.documentNumber}</code>.'
		}
	*/
	personService.getPerson(req.params.id)
		// #swagger.responses[200] = { $ref: '#/components/responses/GetPerson'}
		.then(person => handleResourceResponse(res, person))
		// #swagger.responses[400] = { $ref: '#/components/responses/PersonInvalidId'}
		// #swagger.responses[404] = { $ref: '#/components/responses/NotFound'}
		.catch(next);
}