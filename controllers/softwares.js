var getPagination = require("../helpers").getPagination;

const Software = require('../models/software.schema');

/* Softwares page. */
exports.softwares = {};
exports.softwares.get = function (req, res, next) {
    //TODO : Softwares - Handle options
    var pagination = getPagination(req);
    Software
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, softwares) {
            if (err) return next(err);
            res.json({data: softwares});
        });
};
exports.softwares.post = function (req, res, next) {
    //TODO : Softwares - Create software
    res.status(404).send('Create a new Software');
};
exports.softwares.put = function (req, res, next) {
    //TODO : Softwares - Add Bulk update
    res.status(404).send('Bulk update of softwares');
};
exports.softwares.delete = function (req, res, next) {
    //TODO : Softwares - Remove all softwares
    res.status(404).send('Remove all softwares');
};

/* Software page. */
exports.software = {};
exports.software.get = function (req, res, next) {
    Software
        .findById(req.params.id)
        .exec(function (err, software) {
            if (err) return next(err);
            res.json({data: software});
        });
};
exports.software.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.software.put = function (req, res, next) {
    //TODO : Software - Update software
    res.status(404).send('Update details of softwares');
};
exports.software.delete = function (req, res, next) {
    //TODO : Software - Remove software
    res.status(404).send('Remove software');
};