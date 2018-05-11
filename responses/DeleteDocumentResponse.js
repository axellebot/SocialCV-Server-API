"use strict";

const messages = require('@constants/messages');
const statuses = require('@constants/statuses');

module.exports = class DeleteDocumentResponse extends require('@responses/DataResponse') {
  constructor(documentDeleted) {
    super(documentDeleted);
    this.message = messages.MESSAGE_SUCCESS_RESOURCE_DELETED;
  }
};