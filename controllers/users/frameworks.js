var getPagination = require("../../helpers").getPagination;

const Framework = require('../../models/framework.schema');

/* Frameworks page. */
exports.get = function (req, res, next) {
    //TODO : Frameworks - Handle options
    var pagination = getPagination(req);
    Framework
        .find({user: req.params.id})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, frameworks) {
            if (err) return next(err);
            res.json({data: frameworks});
        });
};
exports.post = function (req, res, next) {
    //TODO : Frameworks - Create framework for user
    res.status(404).send('Create a new Framework for user : '+req.params.id);
};
exports.put = function (req, res, next) {
    //TODO : Frameworks - Add Bulk update for user
    res.status(404).send('Bulk update of frameworks for user : '+req.params.id);
};
exports.delete = function (req, res, next) {
    //TODO : Frameworks - Remove all frameworks for user
    res.status(404).send('Remove all frameworks for user : '+req.params.id);
};