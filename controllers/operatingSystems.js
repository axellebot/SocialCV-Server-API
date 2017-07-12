var getPagination = require("../helpers").getPagination;

const OperatingSystem = require('../models/operatingSystem.schema');

/* OperatingSystems page. */
exports.operatingSystems = {};
exports.operatingSystems.get = function (req, res, next) {
    //TODO : OperatingSystems - Handle options
    var pagination = getPagination(req);
    OperatingSystem
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, operatingSystems) {
            if (err) return next(err);
            res.json({data: operatingSystems});
        });
};
exports.operatingSystems.post = function (req, res, next) {
    //TODO : OperatingSystems - Create operatingSystem
    res.status(404).send('Create a OperatingSystem');
};
exports.operatingSystems.put = function (req, res, next) {
    //TODO : OperatingSystems - Add Bulk update
    res.status(404).send('Bulk update of operatingSystems');
};
exports.operatingSystems.delete = function (req, res, next) {
    //TODO : OperatingSystems - Remove all operatingSystems
    res.status(404).send('Remove all operatingSystems');
};

/* OperatingSystem page. */
exports.operatingSystem = {};
exports.operatingSystem.get = function (req, res, next) {
    OperatingSystem
        .findById(req.params.id)
        .exec(function (err, operatingSystem) {
            if (err) return next(err);
            res.json({data: operatingSystem});
        });
};
exports.operatingSystem.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.operatingSystem.put = function (req, res, next) {
    //TODO : OperatingSystem - Update operatingSystem
    res.status(404).send('Bulk update of operatingSystems');
};
exports.operatingSystem.delete = function (req, res, next) {
    //TODO : OperatingSystem - Remove operatingSystem
    res.status(404).send('Remove operatingSystem');
};