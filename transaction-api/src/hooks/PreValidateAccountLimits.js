const Hook = require('./Hook');
const TransactionLimitError = require('../errors/TransactionLimitError');
const transactionService = require('../services/transactionService');

class PreValidateAccountEnabledForTransact extends Hook {

    hook(transaction) {
        let query = {
            accountId: transaction.account,
            from: new Date(),
            to: new Date(),
            type: transaction.type
        }
        return transactionService.getStatement(query)
            .then(statement => {

                let limit = 0;
                let { [transaction.type]: transactionLimits } = transaction.$account.limits;
                let futureTotalTransacted = statement.total.transacted + transaction.value;
                futureTotalTransacted *= futureTotalTransacted < 0 ? -1 : 1;

                if (transactionLimits && 'daily' in transactionLimits) {
                    limit = transactionLimits.daily;
                }

                if (limit > 0 && futureTotalTransacted > limit) {
                    throw new TransactionLimitError(`daily ${transaction.type} limit reached`);
                }

                return transaction;
            })
    }
}

module.exports = PreValidateAccountEnabledForTransact;