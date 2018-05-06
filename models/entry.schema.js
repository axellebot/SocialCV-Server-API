"use strict";

// Constants
const messages = require('../constants/messages');
const statuses = require('../constants/statuses');
const models = require('../constants/models');
const collections = require('../constants/collections');

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var EntrySchema = new Schema({
  name: {
    type: String,
    default: "",
    required: true
  },
  type: {
    type: String,
    default: "",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    default: null,
    required: true,
    ref: models.MODEL_NAME_USER
  },
  group: {
    type: Schema.Types.ObjectId,
    default: null,
    required: true,
    ref: models.MODEL_NAME_GROUP
  }
}, {
  timestamps: true
});

module.exports = mongoose.model(models.MODEL_NAME_ENTRY, EntrySchema, collections.COLLECTION_NAME_ENTRY);