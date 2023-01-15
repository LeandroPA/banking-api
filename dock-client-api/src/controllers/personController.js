const personService = require('../services/personService');

exports.create = (req, res, next) => {

	personService.createPerson(req.body)
		.then(data => res.status(201).send(data))
		.catch(next);
}
exports.get = (req, res, next) => {

	personService.getPerson(req.params.id)
		.then(person => res.status(person ? 200 : 404).send(person))
		.catch(next);
}

exports.getByDocumentNumber = (req, res, next) => {

	personService.getPersonByDocumentNumber(req.params.documentNumber)
		.then(person => res.status(person ? 200 : 404).send(person))
		.catch(next);
}

exports.delete = (req, res, next) => {

	personService.deletePerson(req.params.id)
		.then(person => res.status(person ? 200 : 400).send(person))
		.catch(next);
}