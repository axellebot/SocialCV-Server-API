"use strict";
module.exports = class UpdateDocumentResponse extends require('./DataResponse') {
    constructor(document) {
        super(document);
        this.message = MESSAGE_SUCCESS_RESOURCE_UPDATED;
    }
};