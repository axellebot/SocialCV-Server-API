"use strict";

const models = require('@constants/models');

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: ""
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

module.exports = mongoose.model(models.MODEL_NAME_PROFILE, ProfileSchema, "profiles");