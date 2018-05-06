"use strict";

const bodyData = require("./data");

// Errors
const WrongDataError = require('../../errors/WrongDataError');

module.exports = [
  bodyData,
  function(req, res, next) {
    if (typeof req.body.data !== "object") return next(new WrongDataError());
    next()
  }
];