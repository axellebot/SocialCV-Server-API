"use strict";

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

// Constants
const messages = require('@constants/messages');
const statuses = require('@constants/statuses');
const models = require('@constants/models');
const part_types = require('@constants/part_types');

var PartSchema = new Schema({
  name: {
    type: String,
    default: "",
    required: true
  },
  type: {
    type: String,
    enum: [part_types.PART_TYPE_LIST_HORIZONTAL, part_types.PART_TYPE_LIST_VERTICAL],
    default: part_types.PART_TYPE_LIST_VERTICAL,
    required: true
  },
  order: {
    type: Number,
    default: 0.0,
    required: true
  },
  profile: {
    type: Schema.Types.ObjectId,
    default: null,
    required: true,
    ref: models.MODEL_NAME_PROFILE
  },
  groups: {
    type: Schema.Types.Mixed,
    body: [{
      type: Schema.Types.ObjectId,
      default: null,
      required: true,
      ref: models.MODEL_NAME_GROUP
    }],
    required: true,
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

module.exports = mongoose.model(models.MODEL_NAME_PART, PartSchema, "parts");