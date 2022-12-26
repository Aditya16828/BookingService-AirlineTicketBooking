const {StatusCodes} = require('http-status-codes');

class ServiceError extends Error{
    constructor(
        message,
        explanation,
        statuscodes = StatusCodes.INTERNAL_ERVER_ERROR
    ){
        this.name = 'ServiceError';
        this.message = message;
        this.explanation = explanation;
        this.statusCodes = statuscodes;
    }
}

module.exports = ServiceError;