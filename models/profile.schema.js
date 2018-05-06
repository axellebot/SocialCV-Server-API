"use strict";

// Constants
const messages = require('../constants/messages');
const statuses = require('../constants/statuses');
const models = require('../constants/models');
const collections = require('../constants/collections');
const roles = require('../constants/roles');
const parameters = require('../constants/parameters');

var mongoose = require('../mongoose');
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
  body: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: models.MODEL_NAME_PART
    }],
    default: []
  },
  user: {
    type: Schema.Types.ObjectId,
    default: null,
    required: true,
    ref: models.MODEL_NAME_USER
  }
}, {
  timestamps: true
});

module.exports = mongoose.model(models.MODEL_NAME_PROFILE, ProfileSchema, collections.COLLECTION_NAME_PROFILE);