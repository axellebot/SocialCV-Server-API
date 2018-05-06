"use strict";

// Require packages
const bcrypt = require('bcrypt');

// Constants
const roles = require('./constants/roles');

// Config
const config = require('./config');

function getRoleRank(checkRole) {
  var role;
  switch (checkRole) {
    case roles.ROLE_ADMIN:
      role = 2;
      break;
    case roles.ROLE_MEMBER:
      role = 1;
      break;
    default:
      role = -1;
  }
  return role;
}

module.exports.getRoleRank = getRoleRank;

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
      //return wrong id to avoid delting data
      return {
        _id: -1
      };
  }
};

/**
 *
 * @param user String
 * @param ownerId String
 * @returns {boolean}
 */
module.exports.userCanEditUserData = function(user, ownerId) {
  if (getRoleRank(user.role) >= getRoleRank(roles.ROLE_ADMIN)) {
    return true;
  }
  return (ownerId === user._id);
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