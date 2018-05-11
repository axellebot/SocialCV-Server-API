"use strict";

module.exports = class SelectDocumentsResponse extends require('@responses/DataResponse') {
    constructor(documents, total = null) {
        super(documents);
        this.total = total;
    }
};