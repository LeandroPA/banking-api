const { Schema } = require('mongoose');
const Person = require('./person');
const { cpf } = require('cpf-cnpj-validator');

const physicalPersonSchema = new Schema({
	fullname: {
		type: String,
		required: true
	},
	cpf: {
		type: String,
		required: true,
		validate: {
			validator: cpf.isValid,
			message: 'invalid cpf'

		}
	},
})

module.exports = Person.discriminator('physical', physicalPersonSchema)