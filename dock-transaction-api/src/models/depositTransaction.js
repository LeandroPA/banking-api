const { Schema } = require('mongoose');
const Transaction = require('./transaction');

const depositTransactionSchema = new Schema({
})

module.exports = Transaction.discriminator('deposit', depositTransactionSchema)