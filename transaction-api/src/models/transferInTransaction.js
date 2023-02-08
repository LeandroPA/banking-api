const { Schema } = require('mongoose');
const Transaction = require('./transaction');
const { optionsTransformToJSON } = require('../util/mongooseUtil');
const mongooseAutopopulate = require('mongoose-autopopulate');

const transferInTransaction = new Schema({
    sender: {
        type: Schema.Types.ObjectId, ref: 'Transaction',
        autopopulate: true
    }
}, optionsTransformToJSON);

transferInTransaction.virtual('source').get(function() {
    return this.sender.account;
});
transferInTransaction.virtual('destination').get(function() {
    return this.account;
});

transferInTransaction.plugin(mongooseAutopopulate);

module.exports = Transaction.discriminator('transfer_in', transferInTransaction);