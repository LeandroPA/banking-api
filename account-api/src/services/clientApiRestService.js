const ApiRestService = require('./apiRestService');
const { CLIENT_API_URL } = process.env;

module.exports = new ApiRestService(CLIENT_API_URL + '/person/');