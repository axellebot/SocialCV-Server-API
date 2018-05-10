"use strict";

module.exports = class LoginResponse extends require('@responses/Response') {
    constructor(token, user) {
        super();
        this.token = token;
        this.user = user;
    }
};