"use strict";

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

// Constants
const models = require('@constants/models');
const entry_types = require('@constants/entry_types');

var EntrySchema = new Schema({
  name: {
    type: String,
    default: "",
    required: true
  },
  type: {
    type: String,
    enum: [entry_types.ENTRY_TYPE_MAP, entry_types.ENTRY_TYPE_EVENT, entry_types.ENTRY_TYPE_TAG],
    default: "",
    required: true
  },
  order: {
    type: Number,
    default: 0.0,
    required: true
  },
  group: {
    type: Schema.Types.ObjectId,
    default: null,
    required: true,
    ref: models.MODEL_NAME_GROUP
  },
  owner: {
    type: Schema.Types.ObjectId,
    default: null,
    required: true,
    ref: models.MODEL_NAME_USER
  },
}, {
  timestamps: true
});

module.exports = mongoose.model(models.MODEL_NAME_ENTRY, EntrySchema, "entries");