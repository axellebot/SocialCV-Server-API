"use strict";
module.exports = class DeleteDocumentsResponse extends require('./Response') {
    constructor(count) {
        super();
        this.message = count + MESSAGE_SUCCESS_RESOURCE_DELETED;
    }
};