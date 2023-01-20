let mongoose = require('mongoose')
let { toJSON } = require('../util/mongooseUtil')

let transactionSchema = new mongoose.Schema(
	{
        account: String,
        value: Number,
        type: { type: String },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

transactionSchema.method('toJSON', toJSON);

module.exports = mongoose.model('Transaction', transactionSchema);