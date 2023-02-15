const { Schema } = require('mongoose');
const Transaction = require('./transaction');

const depositTransactionSchema = new Schema({
});

depositTransactionSchema.virtual('source').get(function() {
    return Promise.resolve();
});
depositTransactionSchema.virtual('destination').get(function() {
    return Promise.resolve(this.$account);
});

module.exports = Transaction.discriminator('deposit', depositTransactionSchema)