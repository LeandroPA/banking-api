const mongoose = require('mongoose');
const { toJSON } = require('../util/mongooseUtil');

const transactionSchema = new mongoose.Schema(
	{
        account: {
            type: String,
            required: [true, '{PATH} is required']
        },
        value: {
            type: Number,
            required: [true, '{PATH} is required'],
            validate: [value => value > 0, '{PATH} should be more than 0'],
            //Ignore more than 2 decimal places
            set: val => parseInt(val * 100) / 100
        },
        date: {
            type: Date,
            default: Date.now
        }
    }, 
    {    
		discriminatorKey: 'type',
    }
)

transactionSchema.method('toJSON', toJSON);

module.exports = mongoose.model('Transaction', transactionSchema);