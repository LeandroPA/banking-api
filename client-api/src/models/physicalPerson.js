const { Schema, isValidObjectId } = require('mongoose');
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

physicalPersonSchema.static('findOneByIdOrDocumentNumber', function(idOrDocumentNumber) {
	if (isValidObjectId(idOrDocumentNumber)) {
		return this.findById(idOrDocumentNumber);
	}
	return this.findOne({ documentNumber: idOrDocumentNumber});
});

module.exports = Person.discriminator('physical', physicalPersonSchema)