"use strict";

module.exports = class  extends require("./AppError") {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || global.constants.MESSAGE.MESSAGE_ERROR_MISSING_PASSWORD;
        this.status = status || 422;
    }
};