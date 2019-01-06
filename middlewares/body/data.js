"use strict";

// Errors
const BodyMissingDataError = require('@errors/BodyMissingDataError');

module.exports = async (req, res, next) => {
  if (!req.body.data) return next(new BodyMissingDataError());
  return next();
};