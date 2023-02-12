const clientApiRestService = require('../services/clientApiRestService');

class CouponTransactionDTO {
    constructor(transaction) {
        this.id = transaction.id;
        this.value = transaction.value;
        this.type = transaction.type;
        this.date = transaction.date;
        this.accounts = {
            source: transaction.source.then(getAccountInfo),
            destination: transaction.destination.then(getAccountInfo)
        };        
    }

    async resolve() {
        this.accounts.source = await this.accounts.source;
        this.accounts.destination = await this.accounts.destination;
        return this;
    }
}

async function getAccountInfo(account) {
	if (!account) {
		return Promise.resolve();
	}
	let holder = await clientApiRestService.get(account.holder);

	return {
		id: account.id,
		agency: account.agency,
		number: account.number,
		name: holder.fullname,
		documentNumber: holder.documentNumber
	}
}

module.exports = CouponTransactionDTO;