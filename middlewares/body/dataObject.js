"use strict";

// Middlewares
const bodyData = require("@middlewares/body/data");

// Errors
const BodyWrongDataError = require('@errors/BodyWrongDataError');

module.exports = [
  bodyData,
 async (req, res, next) => {
    if (typeof req.body.data !== "object") return next(new BodyWrongDataError());
    next()
  }
];