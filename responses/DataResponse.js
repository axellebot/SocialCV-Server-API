"use strict";

module.exports = class DataResponse extends require('./Response') {
  constructor(data) {
    super();
    this.data = data;
  }
};