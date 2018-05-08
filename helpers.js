"use strict";

// Require packages
const bcrypt = require('bcrypt');

// Constants
const roles = require('./constants/roles');

// Config
const config = require('./config');

/**
 *
 * @param entityId
 * @param loggedUser
 * @returns {*}
 */
module.exports.getFilterEditData = function(entityId, loggedUser) {
  switch (loggedUser.role) {
    case roles.ROLE_MEMBER:
      return {
        _id: entityId,
        user: loggedUser._id
      };
    case roles.ROLE_ADMIN:
      return {
        _id: entityId
      };
    default:
      //return wrong id to avoid deleting data
      return {
        _id: -1
      };
  }
};

/**
 *
 * @param a {Object}
 * @param b {Object}
 * @returns {boolean}
 */
module.exports.compareKeys = function(a, b) {
  const
    aKeys = Object.keys(a).sort(),
    bKeys = Object.keys(b).sort();

  return (JSON.stringify(aKeys).equals(JSON.stringify(bKeys)));
};

module.exports.getPageCount = function(itemCount, limit) {
  console.log(itemCount, limit);
  return Math.ceil(itemCount / limit);
};