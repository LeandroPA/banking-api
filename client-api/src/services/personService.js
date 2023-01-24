const Person = require('../models/person')
const PhysicalPerson = require('../models/physicalPerson')

exports.createPerson = (json) => {
	return new PhysicalPerson(json).save();
}

exports.getPerson = (id) => {
	return Person.findById(id);
}

exports.getPersonByDocumentNumber = (documentNumber) => {
	return PhysicalPerson.findOne({documentNumber: documentNumber});
}