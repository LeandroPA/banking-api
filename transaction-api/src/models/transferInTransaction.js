const { Schema, Types } = require('mongoose');
const Transaction = require('./transaction');

const transferInTransaction = new Schema({
    sender: {
        type: Schema.Types.ObjectId, ref: 'Transaction',
    }
});

transferInTransaction.virtual('source').get(function() {
    return this.sender.account;
});
transferInTransaction.virtual('destination').get(function() {
    return this.account;
});

module.exports = Transaction.discriminator('transfer_in', transferInTransaction);