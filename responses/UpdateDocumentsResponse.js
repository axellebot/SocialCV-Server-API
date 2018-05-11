"use strict";

const messages = require('@constants/messages');

module.exports = class UpdateDocumentsResponse extends require('@responses/DataResponse') {
    constructor(documents) {
        super(documents);
        this.message = messages.MESSAGE_SUCCESS_RESOURCE_UPDATED;
    }
};
