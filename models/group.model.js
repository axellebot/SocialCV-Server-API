"use strict";

// Constants
const models = require('../constants/models');

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: {
    type: String,
    default: "",
    required: true
  },
  part: {
    type: Schema.Types.ObjectId,
    default: null,
    required: true,
    ref: models.MODEL_NAME_PART
  },
  entries: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: models.MODEL_NAME_ENTRY
    }],
    default: []
  },
  owner: {
    type: Schema.Types.ObjectId,
    default: null,
    required: true,
    ref: models.MODEL_NAME_USER
  }
}, {
  timestamps: true
});

module.exports = mongoose.model(models.MODEL_NAME_GROUP, GroupSchema, "groups");