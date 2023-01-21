const { Schema } = require('mongoose');
const Transaction = require('./transaction');

const depositTransactionSchema = new Schema({
	// value: {
    //     type: Number,
    //     required: [true, '{PATH} is required'],
    //     validate: [value => value > 0, '{PATH} should be more than 0'],
    //     // set: val => val > 0 ? -val : val
    // }
})

module.exports = Transaction.discriminator('deposit', depositTransactionSchema)