const mongoose = require('mongoose');
const { toJSON } = require('../util/mongooseUtil');
const accountApiRestService = require('../services/accountApiRestService');
const {hook: validateAccountExists } = new (require('../hooks/PreValidateAccountExistsHook'));
const {hook: validateAccountEnabledForTransact } = new (require('../hooks/PreValidateAccountEnabledForTransact'));

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
);

transactionSchema.pre('validate', async function() {
    return Promise.resolve(this)
        .then(validateAccountExists)
        .then(validateAccountEnabledForTransact);
});

transactionSchema.method('toJSON', toJSON);

module.exports = mongoose.model('Transaction', transactionSchema);