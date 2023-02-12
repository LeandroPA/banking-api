const { Schema } = require('mongoose');
const Transaction = require('./transaction');
const { optionsTransformToJSON } = require('../util/mongooseUtil');

const transferInTransaction = new Schema({
    sender: {
        type: Schema.Types.ObjectId, ref: 'Transaction',
        autopopulate: true
    }
}, optionsTransformToJSON);

transferInTransaction.virtual('source').get(function() {
    return Promise.resolve(this.sender.$account);
});
transferInTransaction.virtual('destination').get(function() {
    return Promise.resolve(this.$account);
});

module.exports = Transaction.discriminator('transfer_in', transferInTransaction);