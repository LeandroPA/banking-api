const mongoose = require('mongoose');
const { toJSON } = require('../util/mongooseUtil');
const accountApiRestService = require('../services/accountApiRestService');

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

function validApiRequestResource(id) {
    return accountApiRestService.get(id)
        .catch(err => {
            let { errors } = err.body || {};

            if (errors) {
                err = new Error(errors.id || errors._error);
            }
            
            throw err;
        });
}

function validateAccountExists(transaction) {
    return validApiRequestResource(transaction.account)
        .then(account => { 
            transaction.$account = account;
            transaction.account = account.id;
        })
        .catch(err => transaction.invalidate('account', err.message));
}

transactionSchema.pre('validate', async function() {
    return Promise.resolve(this)
        .then(validateAccountExists);
});

// transactionSchema.pre('validate', async function() {
//     return validApiRequestResource(this.account)
//         .then(account => { 
//             this.$account = account;
//             this.account = account.id;
//         })
//         .catch(err => this.invalidate('account', err.message));
// });

function handleAccountEnabledForTransact(account, transaction) {
	return Promise.resolve(account)
		.then(account => {
			if (!account.enabled) {
				throw new AccountDisabledError('account is disabledd for transactions');
			}

			if (account.blocked) {
				throw new AccountBlockedError();
			}

			return account;
		});
}

transactionSchema.method('toJSON', toJSON);

module.exports = mongoose.model('Transaction', transactionSchema);