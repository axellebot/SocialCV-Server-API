"use strict";

// Errors
const CursorWrongPaginationError=require('@errors/CursorWrongPaginationError');

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = async (req, res, next) => {
  //Pagination
  req.query.offset = Number(req.query.offset);
  req.query.limit = Number(req.query.limit);

  const offset = req.query.offset;
  const limit = req.query.limit;

  if (!offset && !limit) return next(new CursorWrongPaginationError());
  if (isNaN(offset) || isNaN(limit)) return next(new CursorWrongPaginationError("Pagination cursor must be a number."));
  if (offset < 0 || limit < 0) return next(new CursorWrongPaginationError("Pagination cursor must be >=0"));

  console.log("Pagination : {", " offset : ", offset, ", limit : ", limit, "}");

  next();
};