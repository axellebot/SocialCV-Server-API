"use strict";

module.exports = class extends require("./AppError") {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE.MESSAGE_ERROR_DATABASE_SAVE;
        this.status = status || 500;
    }
};