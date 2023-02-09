const ApiRestService = require('./apiRestService');
const CLIENT_API_URL = process.env.CLIENT_API_URL;

module.exports = new ApiRestService(CLIENT_API_URL + '/person/');