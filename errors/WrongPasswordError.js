"use strict";

module.exports = class  extends require("./AppError") {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_WRONG_PASSWORD;
        this.status = status || HTTP_STATUS_BAD_REQUEST;
    }
};