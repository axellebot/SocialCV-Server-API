"use strict";

module.exports = class extends require("./AppError") {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || global.constants.MESSAGE.MESSAGE_ERROR_ACCESS_RESTRICTED;
        this.status = status || 401;
    }
};