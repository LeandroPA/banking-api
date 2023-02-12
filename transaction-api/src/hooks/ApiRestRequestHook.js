const Hook = require('./Hook');

class ApiRestRequestHook extends Hook {

    constructor(apiRestService, element) {
        super();
        this.apiRestService = apiRestService;
        this.element = element;
    }

    hook(document) {
        return this.apiRestService.get(document[element])
            .then(object => {
                document[`$${element}`] = object;
                document[element] = object.id;
                return document;
            })
            .catch(err => {
                let { errors } = err.body || {};

                document.invalidate(element, errors.id || errors._error || err.message);
            });
    }
}

module.exports = ApiRestRequestHook;