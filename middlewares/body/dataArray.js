"use strict";

// Middlewares
const bodyData = require("@middlewares/body/data");

// Errors
const WrongDataError = require('@errors/WrongDataError');

module.exports = [
  bodyData,
  async (req, res, next) => {
    if (!Array.prototype.isArray(req.body.data)) return next(new WrongDataError());
    next()
  }
];