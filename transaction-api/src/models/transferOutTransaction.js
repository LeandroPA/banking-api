const { Schema } = require('mongoose');
const Transaction = require('./transaction');
const { optionsTransformToJSON } = require('../util/mongooseUtil');
const mongooseAutopopulate = require('mongoose-autopopulate');

const transferOutTransaction = new Schema({
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