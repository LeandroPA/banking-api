const personService = require('../services/personService');

exports.create = (req, res, next) => {

	personService.createPerson(req.body)
		.then(data => res.status(201).send(data))
		.catch(next);
}

exports.delete = (req, res, next) => {

	personService.deletePerson(req.params.id)
		.then(person => {
			if (person) {
				res.send(person);
			} else {
				res.status(404).send();
			}
		})
		.catch(next);
}