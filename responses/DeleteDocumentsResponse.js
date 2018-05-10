"use strict";

const messages = require('@constants/messages');
const statuses = require('@constants/statuses');

module.exports = class DeleteDocumentsResponse extends require('@responses/Response') {
  constructor(count) {
    super();
    this.message = count + messages.MESSAGE_SUCCESS_RESOURCE_DELETED;
  }
};