"use strict";

module.exports = class  extends require("./AppError") {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE.MESSAGE_ERROR_WRONG_PASSWORD;
        this.status = status || 400;
    }
};