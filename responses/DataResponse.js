"use strict";

module.exports = class DataResponse extends require('@responses/Response') {
  constructor(data) {
    super();
    this.data = data;
  }
};