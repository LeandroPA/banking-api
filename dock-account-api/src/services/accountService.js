const fetch = require('node-fetch');
const Account = require('../models/account');
const HttpStatusCodeError = require('../errors/HttpStatusCodeError');

const CLIENT_API_URL = process.env.DOCK_CLIENT_API_URL;

function handleApiResponseError(response) {

	if (response.status == 404) {
		body.errors.holder = 'Holder not found';
		throw new HttpStatusCodeError(404, 'Holder not found', body);
	}

	if (response.status >= 500) {
		body.errors.details = 'Internal API error';
		throw new HttpStatusCodeError(500, 'Internal API error', body);
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
	let number = randomNumber(9999999) + 1;
	number = number.toString().padStart(7, 0);
	return `${number}-${calculateVerifierDigit(number)}`
}

function generateAgencyNumber() {
	let number = randomNumber( 1000) + 1;
	return number.toString().padStart(4, 0);
}

exports.createAccount = (json) => {	
	return fetch(`${CLIENT_API_URL}/person/documentNumber/${json.holder}`)
		.then(handleApiResponseError)
		.then(response => response.json())
		.then(client => {
			json.holder = client.id;			
			json.agency = generateAgencyNumber();
			json.number = generateAccountNumber();
			return json;
		})
		.then(account => new Account(account))
		.then(account => account.save());
}

exports.getAccount = (id) => {
	return Account.findById(id);
}

exports.deleteAccount = (id) => {
	return Account.findByIdAndDelete(id);
}