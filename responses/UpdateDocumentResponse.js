"use strict";

const messages = require('../constants/messages');

module.exports = class UpdateDocumentResponse extends require('./DataResponse') {
    constructor(document) {
        super(document);
        this.message = messages.MESSAGE_SUCCESS_RESOURCE_UPDATED;
    }
};