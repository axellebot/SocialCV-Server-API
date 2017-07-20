"use strict";

module.exports = class extends Error {
    constructor(message, status) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message || global.constants.MESSAGE.MESSAGE_ERROR_APP;
        this.status = status || 500;
    }
};