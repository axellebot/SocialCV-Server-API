"use strict";

module.exports = class  extends require("./AppError") {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_EMAIL_ADDRESS_ALREADY_EXIST;
        this.status = status || 422;
    }
};