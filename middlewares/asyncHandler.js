/**
 * asyncHandler
 * used to wrap async middlewares and auto handling errors
 */
const asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next)

module.exports = asyncHandler;