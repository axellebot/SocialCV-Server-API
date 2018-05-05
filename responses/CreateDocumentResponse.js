"use strict";
module.exports = class CreateDocumentResponse extends require('./DataResponse') {
    constructor(documentSaved) {
        super(documentSaved);
        this.message = MESSAGE_SUCCESS_RESOURCE_CREATED;
    }
};