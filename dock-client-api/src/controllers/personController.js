const personService = require('../services/personService');

exports.create = (req, res) => {

	personService.createPerson(req.body)
		.then(data => res.send(data))
		.catch(err => {
			res.status(500).send(err.message)
		});
}

exports.delete = (req, res) => {

	personService.deletePerson(req.params.id)
		.then(person => {
			if (person) {
				res.send(person);
			} else {
				res.status(404).send();
			}
		})        
		.catch(err => res.status(500).send());
}