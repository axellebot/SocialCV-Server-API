"use strict";

// Errors
const MissingDataError = require('@errors/MissingDataError');

module.exports = async (req, res, next) => {
  if (!req.body.data) return next(new MissingDataError());
  return next();
};