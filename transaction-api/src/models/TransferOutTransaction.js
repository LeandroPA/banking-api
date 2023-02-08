const { Schema, ObjectId } = require('mongoose');
const Transaction = require('./transaction');

const transferOutTransaction = new Schema({
    receiver: {
        type: ObjectId, ref: 'Transaction',
    }
});

transferOutTransaction.virtual('source').get(function() {
    return this.account;
});
transferOutTransaction.virtual('destination').get(function() {
    return this.receiver.account;
});

module.exports = Transaction.discriminator('transfer_out', transferOutTransaction)