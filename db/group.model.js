"use strict";

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

// Constants
const models = require('@constants/models');

const GROUP_TYPE_LIST_HORIZONTAL = "GROUP_TYPE_LIST_HORIZONTAL";
const GROUP_TYPE_LIST_VERTICAL = "GROUP_TYPE_LIST_VERTICAL";
const GROUP_TYPE_GRID_HORIZONTAL = "GROUP_TYPE_GRID_HORIZONTAL";
const GROUP_TYPE_GRID_VERTICAL = "GROUP_TYPE_GRID_VERTICAL";

const GROUP_TYPE_ENUM = [GROUP_TYPE_LIST_HORIZONTAL, GROUP_TYPE_LIST_VERTICAL, GROUP_TYPE_GRID_HORIZONTAL, GROUP_TYPE_GRID_VERTICAL];

var GroupSchema = new Schema({
  name: {
    type: String,
    default: "",
    required: true
  },
  type: {
    type: String,
    enum: GROUP_TYPE_ENUM,
    default: GROUP_TYPE_LIST_VERTICAL,
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
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model(models.MODEL_NAME_GROUP, GroupSchema, "groups");