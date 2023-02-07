const { Schema, ObjectId } = require('mongoose');
const Transaction = require('./transaction');

const transferOutTransaction = new Schema({
    destination: {
        type: ObjectId, ref: 'User',
    }
})

module.exports = Transaction.discriminator('transfer_out', transferOutTransaction)