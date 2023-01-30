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
			description: 'A new physical person creation. Requires `fullname` and `documentNumber` (Brazil CPF format).',			
			content: {
				'application/json': {
					schema: { $ref: '#/definitions/New Person' },
				}
			}
		}
	*/

	personService.createPerson(req.body)
		.then(person => res.status(201).json(person))
		.catch(next);
}
exports.get = (req, res, next) => {

	personService.getPerson(req.params.id)
		.then(person => handleResourceResponse(res, person))
		.catch(next);
}

exports.getByDocumentNumber = (req, res, next) => {

	personService.getPerson(req.params.documentNumber)
		.then(person => handleResourceResponse(res, person))
		.catch(next);
}