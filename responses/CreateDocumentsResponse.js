"use strict";

const messages = require('@constants/messages');

module.exports = class CreateDocumentsResponse extends require('@responses/DataResponse') {
  constructor(documentsSaved) {
    super(documentsSaved);
    this.message = messages.MESSAGE_SUCCESS_RESOURCE_CREATED;
  }
};