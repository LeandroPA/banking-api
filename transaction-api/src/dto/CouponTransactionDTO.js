const clientApiRestService = require('../services/clientApiRestService');
const { safelyPopulate } = require('../util/mongooseUtil');

function populate(transaction, elementPopulate, elementGetter) {
    return safelyPopulate(transaction, elementPopulate, 'account')
        .then(transaction => transaction[elementGetter])
        .then(getAccountInfo);
}

class CouponTransactionDTO {
    constructor(transaction) {
        this.id = transaction.id;
        this.currency = transaction.$account.then(getCurrency);
        this.value = transaction.value;
        this.type = transaction.type;
        this.date = transaction.date;
        this.accounts = {
            source: populate(transaction, 'sender', 'source'),
            destination: populate(transaction, 'receiver', 'destination')
        };        
    }

    async resolve() {
        this.currency = await this.currency;
        this.accounts.source = await this.accounts.source;
        this.accounts.destination = await this.accounts.destination;
        return this;
    }

    toLocale(req) {
        this.value *= this.value < 0 ? -1 : 1;
        this.value = this.value.toLocaleString(req.locale, {style: 'currency', currency: this.currency});
        this.date = this.date.toLocaleDateString(req, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
        this.type = req.__(`transaction.type.${this.type}`);
        return this;
    }
}

async function getCurrency(account) {
	if (!account) {
		return Promise.resolve();
	}

    return account.balance.currency;
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