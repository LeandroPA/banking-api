const { Schema } = require('mongoose');
const Transaction = require('./transaction');

const withdrawTransactionSchema = new Schema({
	value: {
        type: Number,
        set: val => val > 0 ? -val : val
    }
})

module.exports = Transaction.discriminator('withdraw', withdrawTransactionSchema)