"use strict";

const bodyData = require("./data");

// Errors
const WrongDataError = require('../../errors/WrongDataError');

module.exports = [
  bodyData,
  (req, res, next) => {
    if (!Array.isArray(req.body.data)) return next(new WrongDataError());
    next()
  }
];