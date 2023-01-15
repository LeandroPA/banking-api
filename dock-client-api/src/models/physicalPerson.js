let { Schema } = require('mongoose')
let Person = require('./person')

let physicalPersonSchema = new Schema({
  fullname: String,
  cpf: String,
})

module.exports = Person.discriminator('PhysicalPerson', physicalPersonSchema)