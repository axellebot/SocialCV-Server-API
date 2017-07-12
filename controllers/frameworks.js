var getPagination = require("../helpers").getPagination;

const Framework = require('../models/framework.schema');

/* Frameworks page. */
exports.frameworks = {};
exports.frameworks.get = function (req, res, next) {
    //TODO : Frameworks - Handle options
    var pagination = getPagination(req);
    Framework
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, frameworks) {
            if (err) return next(err);
            res.json({data: frameworks});
        });
};
exports.frameworks.post = function (req, res, next) {
    //TODO : Frameworks - Create framework
    res.status(404).send('Create a Framework');
};
exports.frameworks.put = function (req, res, next) {
    //TODO : Frameworks - Add Bulk update
    res.status(404).send('Bulk update of frameworks');
};
exports.frameworks.delete = function (req, res, next) {
    //TODO : Frameworks - Remove all frameworks
    res.status(404).send('Remove all frameworks');
};

/* Framework page. */
exports.framework = {};
exports.framework.get = function (req, res, next) {
    Framework
        .findById(req.params.id)
        .exec(function (err, framework) {
            if (err) return next(err);
            res.json({data: framework});
        });
};
exports.framework.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.framework.put = function (req, res, next) {
    //TODO : Framework - Update framework
    res.status(404).send('Bulk update of frameworks');
};
exports.framework.delete = function (req, res, next) {
    //TODO : Framework - Remove framework
    res.status(404).send('Remove framework');
};