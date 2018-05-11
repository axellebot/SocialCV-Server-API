"use strict";

const bodyData = require("@middlewares/body/data");

// Errors
const WrongDataError = require('@errors/WrongDataError');

module.exports = [
  bodyData,
  (req, res, next) => {
    if (typeof req.body.data !== "object") return next(new WrongDataError());
    next()
  }
];