"use strict";

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

// Constants
const models = require('@constants/models');
const profile_types = require('@constants/profile_types');

var ProfileSchema = new Schema({
  title: {
    type: String,
    default: "",
    required: true
  },
  subtitle: {
    type: String,
    default: "",
    required: true
  },
  picture: {
    type: String,
    default: "",
    required: true
  },
  cover: {
    type: String,
    default: "",
    required: true
  },
  type: {
    type: String,
    enum: [profile_types.PROFILE_TYPE_1, profile_types.PROFILE_TYPE_2, profile_types.PROFILE_TYPE_3, profile_types.PROFILE_TYPE_4],
    default: profile_types.PROFILE_TYPE_1,
    required: true
  },
  parts: {
    type: Schema.Types.Mixed,
    body: [{
      type: Schema.Types.ObjectId,
      ref: models.MODEL_NAME_PART
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

module.exports = mongoose.model(models.MODEL_NAME_PROFILE, ProfileSchema, "profiles");