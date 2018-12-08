"use strict";

const models = require('@constants/models');

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

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
  picture:{
    type : String,
    default : "",
    required : true
  },
  cover:{
    type : String,
    default : "",
    required : true
  },
  parts: {
    type: [{
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