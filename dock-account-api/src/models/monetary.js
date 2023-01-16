let mongoose = require('mongoose')
let { toJSON } = require('../util/mongooseUtil')

let monetarySchema = new mongoose.Schema(
	{
        value: Number,
        currency: String,
    }
)

monetarySchema.method('toJSON', toJSON);

module.exports = mongoose.model('monetary', monetarySchema);