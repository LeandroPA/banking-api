const Person = require('../models/person')
const PhysicalPerson = require('../models/physicalPerson')

exports.createPerson = (json) => {
	let person = new PhysicalPerson(json);
  
	//TODO Check validations
	return person.save();
}

exports.deletePerson = (id) => {
	return Person
		.findByIdAndDelete(id);
}