"use strict";

// Constants
const messages = require('@constants/messages');
const statuses = require('@constants/statuses');
const models = require('@constants/models');

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

var PartSchema = new Schema({
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
  order:{
    type: Number,
    default: 0.0,
    required: true
  },
  profile:{
    type: Schema.Types.ObjectId,
    default: null,
    required: true,
    ref: models.MODEL_NAME_PROFILE
  },
  groups: {
    type: [{
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