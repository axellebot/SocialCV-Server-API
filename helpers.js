"use strict";

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