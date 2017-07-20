"use strict";

module.exports = class extends require("./AppError") {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE.MESSAGE_ERROR_MISSING_PRIVILEGE;
        this.status = status || 401;
    }
};