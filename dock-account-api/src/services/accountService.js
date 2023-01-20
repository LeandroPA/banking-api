const fetch = require('node-fetch');
const Account = require('../models/account');
const { getSequencial } = require('../services/sequencialGeneratorService');
const HttpStatusCodeError = require('../errors/HttpStatusCodeError');
const AccountDisabledError = require('../errors/AccountDisabledError');

const CLIENT_API_URL = process.env.DOCK_CLIENT_API_URL;
const accountNumberIdentifier = 'account_number';

function handleApiResponseError(response) {

	let body = {
		errors: {}
	};

	if (response.status == 404) {
		body.errors.holder = 'Holder not found';
		throw new HttpStatusCodeError(404, 'Holder not found', body);
	}

	if (response.status >= 500 || response instanceof fetch.FetchError) {
		body.errors.details = 'Internal API error';
		throw new HttpStatusCodeError(500, 'Internal API error', body);
	}

	if (response instanceof Error) {
		throw response; //Pass to the next catch
	}

	return response;
}

function randomNumber(max) {
	return Math.floor(Math.random() * max );
}

function calculateVerifierDigit(number) {

	let verifierDigit = 0;

	for (let i = 0; i < number.length; i++) {
		verifierDigit += number[i] * (number.length - i + 1);
	}
	
	verifierDigit = verifierDigit % 11;
	return verifierDigit > 1 ? 11 - verifierDigit : 0;
}

function generateAccountNumber() {
	return getSequencial(accountNumberIdentifier)
		.catch(err => 0) // Default value in case of error
		.then(number => number.toString().padStart(7, 0))
		.then(number => `${number}-${calculateVerifierDigit(number)}`);
}

function generateAgencyNumber() {
	let number = randomNumber(1000) + 1;
	return number.toString().padStart(4, 0);
}

exports.createAccount = (json) => {	
	return fetch(`${CLIENT_API_URL}/person/documentNumber/${json.holder}`)
		.catch(handleApiResponseError)
		.then(handleApiResponseError)
		.then(response => response.json())
		.then(async client => {
			json.holder = client.id;			
			json.agency = generateAgencyNumber();
			json.number = await generateAccountNumber();
			return json;
		})
		.then(account => new Account(account))
		.then(account => account.save());
}

exports.getAccount = (id) => {
	return Account.findById(id);
}

exports.blockAccount = (id, status) => {
	return exports.getAccount(id)
		.then(account => {
			if (!account.enabled) {
				throw new AccountDisabledError(`Can't ${status ? 'block' : 'unblock'} a disabled account`);
			}
			account;
		})
		.then(account => {
			account.blocked = status;
			return account;
		})
		.then(account => account.save());
}

exports.disableAccount = (id) => {
	return exports.getAccount(id)
		.then(account => {
			if (!account.enabled) {
				throw new AccountDisabledError(`Account already disabled`);
			}
			account.enabled = false;
			return account;
		})
		.then(account => account.save());
}

exports.deleteAccount = (id) => {
	return Account.findByIdAndDelete(id);
}