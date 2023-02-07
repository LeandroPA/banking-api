class CouponTransactionDTO {
    constructor(params) {
        this.id = params.id;
        this.value = params.value;
        this.type = params.type;
        this.date = params.date;
        this.accounts = {
            source: params.accountSource,
            destin: params.accountSource,
        };        
    }
}

module.exports = CouponTransactionDTO;