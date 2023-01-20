const HttpStatusCodeError = require('../errors/HttpStatusCodeError');
const personService = require('../services/personService');

const handleResourceResponse = (res, data) => {

	console.info(res, data)

	if (!data) {
		throw new HttpStatusCodeError(404, 'Not Found', null);
	}
	res.status(200).json(data);
};

exports.create = (req, res, next) => {

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

	personService.getPersonByDocumentNumber(req.params.documentNumber)
		.then(person => handleResourceResponse(res, person))
		.catch(next);
}

exports.delete = (req, res, next) => {

	personService.deletePerson(req.params.id)
		.then(person => handleResourceResponse(res, person))
		.catch(next);
}