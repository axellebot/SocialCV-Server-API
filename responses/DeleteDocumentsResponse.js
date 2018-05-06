"use strict";

const messages = require('../constants/messages');
const statuses = require('../constants/statuses');

module.exports = class DeleteDocumentsResponse extends require('./Response') {
  constructor(count) {
    super();
    this.message = count + messages.MESSAGE_SUCCESS_RESOURCE_DELETED;
  }
};