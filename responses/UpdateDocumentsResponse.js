"use strict";
module.exports = class UpdateDocumentsResponse extends require('./DataResponse') {
    constructor(documents) {
        super(documents);
        this.message = MESSAGE_SUCCESS_RESOURCE_UPDATED;
    }
};
