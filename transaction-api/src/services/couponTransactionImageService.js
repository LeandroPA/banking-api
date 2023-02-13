const localeService = require("./localeService");

exports.generateCouponTransaction = (couponTransactionDTO) => {

    let couponLocale = couponTransactionDTO.toLocale(localeService);
    
    return couponLocale;
}