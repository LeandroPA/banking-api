const { Schema } = require('mongoose');
const Person = require('./person');
const { cpf } = require('cpf-cnpj-validator');

const physicalPersonSchema = new Schema({
	fullname: {
		type: String,
		required: [true, 'fullname is required']
	},
	documentNumber: {
		type: String,
		required: [true, 'documentNumber is required'],
		validate: [cpf.isValid, 'Invalid documentNumber format']
	},
})

module.exports = Person.discriminator('physical', physicalPersonSchema)