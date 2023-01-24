const { Schema } = require('mongoose');
const Transaction = require('./transaction');

const withdrawTransactionSchema = new Schema({
	value: {
        type: Number,
        required: [true, '{PATH} is required'],
        //In withdraw, the values are negative, so the validation is
        //inverted because of 'set'
        validate: [value => value < 0, '{PATH} should be more than 0'],
        set: val => parseInt(-val * 100) / 100
    }
})

module.exports = Transaction.discriminator('withdraw', withdrawTransactionSchema)