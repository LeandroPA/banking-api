const personService = require('../services/personService');

const handleResourceResponse = (res, data) => 
	res.status(data ? 200 : 404).send(data);

exports.create = (req, res, next) => {

	personService.createPerson(req.body)
		.then(data => res.status(201).send(data))
		.catch(next);
}
exports.get = (req, res, next) => {

	personService.getPerson(req.params.id)
		.then(person => handleResourceResponse(res, data))
		.catch(next);
}

exports.getByDocumentNumber = (req, res, next) => {

	personService.getPersonByDocumentNumber(req.params.documentNumber)
		.then(person => handleResourceResponse(res, data))
		.catch(next);
}

exports.delete = (req, res, next) => {

	personService.deletePerson(req.params.id)
		.then(person => handleResourceResponse(res, data))
		.catch(next);
}