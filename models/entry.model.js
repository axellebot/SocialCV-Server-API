"use strict";

// Constants
const models = require('@constants/models');

var mongoose = require('@mongoose');
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
  group:{
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