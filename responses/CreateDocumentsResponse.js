"use strict";
module.exports = class CreateDocumentsResponse extends require('./DataResponse') {
    constructor(documentsSaved) {
        super(documentsSaved);
        this.message = MESSAGE_SUCCESS_RESOURCE_CREATED;
    }
};