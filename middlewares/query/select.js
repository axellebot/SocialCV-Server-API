"use strict";

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next) {
  req.queryParsed = req.queryParsed || {};
  req.queryParsed.select = req.queryParsed.select || {};

  var fields = req.query.fields;
  if (fields) {
    req.queryParsed.select = fields.replace(',', ' ');
    console.log("Select ", req.queryParsed.select);
    delete req.query.fields;
  }
  next();
};