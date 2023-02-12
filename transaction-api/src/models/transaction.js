const mongoose = require('mongoose');
const { toJSON } = require('../util/mongooseUtil');
const { hook: validateAccountExists } = new (require('../hooks/PreValidateAccountExistsHook'));
const { hook: validateAccountEnabledForTransact } = new (require('../hooks/PreValidateAccountEnabledForTransact'));
const { hook: validateAccountFunds } = new (require('../hooks/PreValidateAccountFunds'));
const { hook: validateAccountLimits } = new (require('../hooks/PreValidateAccountLimits'));

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

transactionSchema.virtual('$account')
    .get(function() {

        if (this._account || !this.account) {
            return Promise.resolve(this._account);
        }

        return validateAccountExists(this).then(() => this._account);
    })
    .set(function(account) {
        this._account = account;
    });

transactionSchema.pre('validate', async function() {
    this.date = new Date();
    return Promise.resolve(this)
        .then(validateAccountExists)
        .then(validateAccountEnabledForTransact)
        .then(validateAccountFunds)
        .then(validateAccountLimits)
        .catch(err => {
            console.error('Error on transaction pre validate: ', err);
            return Promise.reject(err);
        });
});

transactionSchema.method('toJSON', toJSON);

module.exports = mongoose.model('Transaction', transactionSchema);