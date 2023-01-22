const accountService = require('../services/accountService');
const HttpStatusCodeError = require('../errors/HttpStatusCodeError')

const handleResourceResponse = (res, data) => {

	if (!data) {
		throw new HttpStatusCodeError(404, 'Not Found', null);
	}
	res.status(200).json(data);
};

exports.create = (req, res, next) => {

	accountService.createAccount(req.body)
		.then(account => res.status(201).json(account))
		.catch(next);
}

exports.get = (req, res, next) => {

	accountService.getAccount(req.params.id)
		.then(account => handleResourceResponse(res, account))
		.catch(next);
}

exports.getByAgencyAndNumber = (req, res, next) => {

	accountService.getAccountByNumberAndAgency(req.params.agency, req.params.number)
		.then(account => handleResourceResponse(res, account))
		.catch(next);
}

exports.block = (req, res, next) => {

	accountService.blockAccount(req.params.id, true)
		.then(account => handleResourceResponse(res, account))
		.catch(next);
}

exports.unblock = (req, res, next) => {

	accountService.blockAccount(req.params.id, false)
		.then(account => handleResourceResponse(res, account))
		.catch(next);
}

exports.disable = (req, res, next) => {

	accountService.disableAccount(req.params.id)
		.then(account => handleResourceResponse(res, account))
		.catch(next);
}