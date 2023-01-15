const { Schema } = require('mongoose');
const Person = require('./person');
const { cpf } = require('cpf-cnpj-validator');

const physicalPersonSchema = new Schema({
	fullname: {
		type: String,
		required: true
	},
	documentNumber: {
		type: String,
		required: true,
		validate: [cpf.isValid, 'Invalid document number format']
	},
})

module.exports = Person.discriminator('physical', physicalPersonSchema)