const { Schema } = require('mongoose');
const Transaction = require('./transaction');

const depositTransactionSchema = new Schema({
});

depositTransactionSchema.virtual('source').get(function() {
    return undefined;
});
depositTransactionSchema.virtual('destination').get(function() {
    return this.account;
});

module.exports = Transaction.discriminator('deposit', depositTransactionSchema)