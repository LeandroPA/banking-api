const Person = require('../models/person')
const PhysicalPerson = require('../models/physicalPerson')

exports.create = (req, res) => {

    let person = new PhysicalPerson(req.body);
  
    person
        .save()
        .then(data => res.send(data))
        .catch(err => res.status(500).send());
}

exports.delete = (req, res) => {

    Person
        .findByIdAndDelete(req.params.id)
        .then(person => {
            if (person) {
                res.send(person);
            } else {
                res.status(404).send();
            }
        })        
        .catch(err => res.status(500).send());
}