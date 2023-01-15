const express = require('express');
const router = express.Router();
const Person = require('../models/person')
const PhysicalPerson = require('../models/physicalPerson')

router.post('/', function(req, res, next) {
  let person = new PhysicalPerson(req.body);

  person.save();

  res.send(person);
});

router.delete('/:id', function(req, res, next) {
  Person.findByIdAndDelete(req.params.id).then(person => {
    res.send(person);
  });
});

module.exports = router;
