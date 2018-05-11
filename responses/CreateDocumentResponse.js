"use strict";

const messages = require('@constants/messages');
const statuses = require('@constants/statuses');

module.exports = class CreateDocumentResponse extends require('@responses/DataResponse') {
  constructor(documentSaved) {
    super(documentSaved);
    this.message = messages.MESSAGE_SUCCESS_RESOURCE_CREATED;
  }
};