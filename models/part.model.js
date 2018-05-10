"use strict";

// Constants
const messages = require('../constants/messages');
const statuses = require('../constants/statuses');
const models = require('../constants/models');

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var PartSchema = new Schema({
  name: {
    type: String,
    default: "",
    required: true
  },
  profile: {
    type: Schema.Types.ObjectId,
    default: null,
    required: true,
    ref: models.MODEL_NAME_PROFILE
  },
  groups: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: models.MODEL_NAME_GROUP
    }],
    default: []
  },
  owner: {
    type: String,
    default: null,
    required: true,
    ref: models.MODEL_NAME_USER
  }
}, {
  timestamps: true
});

module.exports = mongoose.model(models.MODEL_NAME_PART, PartSchema, "parts");