"use strict";

module.exports = class extends Error {
    constructor(message, status) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_APP;
        this.status = status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
    }
};