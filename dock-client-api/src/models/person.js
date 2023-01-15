let mongoose = require('mongoose')
let { toJSON } = require('../util/mongooseUtil')

let personSchema = new mongoose.Schema(
    {}, 
    { 
        discriminatorKey: 'type',
        timestamps: true 
    })

personSchema.method('toJSON', toJSON);

module.exports = mongoose.model('Person', personSchema);