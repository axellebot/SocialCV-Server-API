"use strict";

module.exports = class extends require("./AppError") {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_USER_NOT_FOUND;
        this.status = status || HTTP_STATUS_NOT_FOUND;
    }
};