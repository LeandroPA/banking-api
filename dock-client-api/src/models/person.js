let mongoose = require('mongoose')

let personSchema = new mongoose.Schema(
    {

    }, 
    { 
        discriminatorKey: 'type',
        timestamps: true 
    })

module.exports = mongoose.model('Person', personSchema);