const { Schema, ObjectId } = require('mongoose');
const Transaction = require('./transaction');

const transferInTransaction = new Schema({
    source: {
        type: ObjectId, ref: 'Transaction',
    }
});

transferInTransaction.virtual('source').get(function() {
    return this.account;
});
transferInTransaction.virtual('destination').get(function() {
    return this.source.account;
});

module.exports = Transaction.discriminator('transfer_in', transferInTransaction);