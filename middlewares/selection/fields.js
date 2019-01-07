"use strict";

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = async (req, res, next) => {
  req.query.fields = req.query.fields || ""; // fields selected or all fields
  var fieldsString = req.query.fields;

  if (fieldsString) {
    req.query.fields = fieldsString.replace(',', ' ');
    console.log("Fields : ", req.query.fields);
  }

  next();
};