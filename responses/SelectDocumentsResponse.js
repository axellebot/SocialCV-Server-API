"use strict";
module.exports = class SelectDocumentsResponse extends require('./DataResponse') {
    constructor(documents, count = null, pageCount = null) {
        super(documents);
        this.count = count;
        this.pageCount = pageCount
    }
};