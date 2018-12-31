"use strict";

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

// Constants
const models = require('@constants/models');

const ENTRY_TYPE_MAP = "map";
const ENTRY_TYPE_EVENT = "event";
const ENTRY_TYPE_TAG = "tag";

const ENTRY_TYPE_ENUM = [ENTRY_TYPE_MAP, ENTRY_TYPE_EVENT, ENTRY_TYPE_TAG];

var EntrySchema = new Schema({
  name: {
    type: String,
    default: "",
    required: true
  },
  type: {
    type: String,
    enum: ENTRY_TYPE_ENUM,
    default: ENTRY_TYPE_MAP,
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