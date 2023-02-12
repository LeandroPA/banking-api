const Hook = require('./Hook');
const InsufficientFundsError = require('../errors/InsufficientFundsError');

class PreValidateAccountFunds extends Hook {

    async hook(transaction) {

        let account = await transaction.$account;

        let futureTotalBalance = account.balance.value + transaction.value;

        if (futureTotalBalance < 0 && transaction.value < 0) {
            throw new InsufficientFundsError();
        }

        return transaction;
    }
}

module.exports = PreValidateAccountFunds;