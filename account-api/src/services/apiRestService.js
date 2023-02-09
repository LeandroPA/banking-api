const fetch = require('node-fetch');
const HttpStatusCodeError = require('../errors/HttpStatusCodeError');

function handleSucessfulRequest(response) {
    if (response.ok) {
        return response;
    } else {
        return response.json().then(body => {
            throw new HttpStatusCodeError(response.status, response.statusText, body);
        });
    }
}

function handleRequestError(error) {
    if (error instanceof fetch.FetchError) {
		throw new HttpStatusCodeError(500, 'Internal API error', {errors: {details: 'Internal API error'}});
    } else {
        throw error;
    }
}

function toJson(response) {
    return response.json();
}

class ApiRestService {  
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getBaseUrl(path) {
        return `${this.baseUrl}${path ? path : ''}`;
    }
    
    request(path, ...args) {
    
        if (path && typeof path == 'string') {
            path = this.getBaseUrl(path)
        }
    
        return fetch(path, args)
            .then(handleSucessfulRequest)
            .catch(handleRequestError);
    }

    get(id) {
        return this.request(`${id}`).then(toJson);
    }

    create(params) {
        return this.request('', {method: 'POST', body: JSON.stringify(params)})
            .then(toJson);
    }

    update(params) {
        return this.request(`${id}`, {method: 'PUT', body: JSON.stringify(params)})
            .then(toJson);
    }

    delete(id) {
        return this.request(`${id}`, {method: 'DELETE'}).then(toJson);
    }
}
  
module.exports = ApiRestService;