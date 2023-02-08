const { Schema } = require('mongoose');
const Transaction = require('./transaction');
const { optionsTransformToJSON } = require('../util/mongooseUtil');
const mongooseAutopopulate = require('mongoose-autopopulate');

const transferOutTransaction = new Schema({
	value: {
        type: Number,
        required: [true, '{PATH} is required'],
        //In withdraw, the values are negative, so the validation is
        //inverted because of 'set'
        validate: [value => value < 0, '{PATH} should be more than 0'],
        set: val => parseInt(-val * 100) / 100
    },
    receiver: {
        type: Schema.Types.ObjectId, ref: 'Transaction',
        autopopulate: true
    }
}, optionsTransformToJSON);

transferOutTransaction.virtual('source').get(function() {
    return this.account;
});
transferOutTransaction.virtual('destination').get(function() {
    return this.receiver.account;
});

transferOutTransaction.plugin(mongooseAutopopulate);

module.exports = Transaction.discriminator('transfer_out', transferOutTransaction)