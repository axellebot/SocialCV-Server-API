"use strict";

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

// Constants
const models = require('@constants/models');
const group_types = require('@constants/group_types');

var GroupSchema = new Schema({
  name: {
    type: String,
    default: "",
    required: true
  },
  type: {
    type: String,
    enum: [group_types.GROUP_TYPE_LIST_HORIZONTAL, group_types.GROUP_TYPE_LIST_VERTICAL, group_types.GROUP_TYPE_GRID_HORIZONTAL, group_types.GROUP_TYPE_GRID_VERTICAL],
    default: group_types.GROUP_TYPE_LIST_VERTICAL,
    required: true
  },
  order: {
    type: Number,
    default: 0.0,
    required: true
  },
  part: {
    type: Schema.Types.ObjectId,
    default: null,
    required: true,
    ref: models.MODEL_NAME_PART
  },
  entries: {
    type: Schema.Types.Mixed,
    body: [{
      type: Schema.Types.ObjectId,
      ref: models.MODEL_NAME_ENTRY
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

module.exports = mongoose.model(models.MODEL_NAME_GROUP, GroupSchema, "groups");