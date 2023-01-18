const { Schema } = require('mongoose');
const Person = require('./person');
const { cpf } = require('cpf-cnpj-validator');

const physicalPersonSchema = new Schema({
	fullname: {
		type: String,
		required: [true, '{PATH} is required']
	},
	documentNumber: {
		type: String,
		unique: true,
		dropDups: true,
		required: [true, '{PATH} is required'],
		validate: [cpf.isValid, 'Invalid {PATH} format']
	},
})

module.exports = Person.discriminator('physical', physicalPersonSchema)