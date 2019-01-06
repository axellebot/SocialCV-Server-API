"use strict";

// Middlewares
const bodyData = require("@middlewares/body/data");

// Errors
const BodyWrongDataError = require('@errors/BodyWrongDataError');

module.exports = [
  bodyData,
  async (req, res, next) => {
    if (!Array.prototype.isArray(req.body.data)) return next(new BodyWrongDataError());
    next()
  }
];