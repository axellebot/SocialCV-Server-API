"use strict";
module.exports = class DeleteDocumentResponse extends require('./DataResponse') {
    constructor(documentDeleted) {
        super(documentDeleted);
        this.message = MESSAGE_SUCCESS_RESOURCE_DELETED;
    }
};