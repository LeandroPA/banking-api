const Hook = require('./Hook');
const InsufficientFundsError = require('../errors/InsufficientFundsError');

class PreValidateAccountFunds extends Hook {

    hook(transaction) {

        let futureTotalBalance = transaction.$account.balance.value + transaction.value;

        if (futureTotalBalance < 0 && transaction.value < 0) {
            throw new InsufficientFundsError();
        }

        return transaction;
    }
}

module.exports = PreValidateAccountFunds;