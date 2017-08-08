const bodyData = require("./data");

module.exports = [
    bodyData,
    function (req, res, next) {
        if (typeof req.body.data !== "object") return next(new WrondDataError());
        next()
    }];