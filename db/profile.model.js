"use strict";

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

// Constants
const models = require('@constants/models');

const PROFILE_TYPE_1 = "PROFILE_TYPE_MAIN";
const PROFILE_TYPE_2 = "PROFILE_TYPE_HEADER_MAIN";
const PROFILE_TYPE_3 = "PROFILE_TYPE_MAIN_SIDE";
const PROFILE_TYPE_4 = "PROFILE_TYPE_HEADER_MAIN_SIDE";
const PROFILE_TYPE_ENUM = [PROFILE_TYPE_1, PROFILE_TYPE_2, PROFILE_TYPE_3, PROFILE_TYPE_4];

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
    enum: PROFILE_TYPE_ENUM,
    default: PROFILE_TYPE_1,
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