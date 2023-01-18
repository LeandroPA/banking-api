const accountService = require('../services/accountService');

const handleResourceResponse = (res, data) => 
	res.status(data ? 200 : 404).send(data);

exports.create = (req, res, next) => {

	accountService.createAccount(req.body)
		.then(account => res.status(201).send(account))
		.catch(next);
}
exports.get = (req, res, next) => {

	accountService.getAccount(req.params.id)
		.then(account => handleResourceResponse(res, account))
		.catch(next);
}

exports.delete = (req, res, next) => {

	accountService.deleteAccount(req.params.id)
		.then(account => handleResourceResponse(res, account))
		.catch(next);
}