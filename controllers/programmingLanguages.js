var getPagination = require("../helpers").getPagination;

const ProgrammingLanguage = require('../models/programmingLanguage.schema');

/* ProgrammingLanguages page. */
exports.programmingLanguages = {};
exports.programmingLanguages.get = function (req, res, next) {
    //TODO : ProgrammingLanguages - Handle options
    var pagination = getPagination(req);
    ProgrammingLanguage
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, programmingLanguages) {
            if (err) return next(err);
            res.json({data: programmingLanguages});
        });
};
exports.programmingLanguages.post = function (req, res, next) {
    //TODO : ProgrammingLanguages - Create programmingLanguage
    res.status(404).send('Create a ProgrammingLanguage');
};
exports.programmingLanguages.put = function (req, res, next) {
    //TODO : ProgrammingLanguages - Add Bulk update
    res.status(404).send('Bulk update of programmingLanguages');
};
exports.programmingLanguages.delete = function (req, res, next) {
    //TODO : ProgrammingLanguages - Remove all programmingLanguages
    res.status(404).send('Remove all programmingLanguages');
};

/* ProgrammingLanguage page. */
exports.programmingLanguage = {};
exports.programmingLanguage.get = function (req, res, next) {
    ProgrammingLanguage
        .findById(req.params.id)
        .exec(function (err, programmingLanguage) {
            if (err) return next(err);
            res.json({data: programmingLanguage});
        });
};
exports.programmingLanguage.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.programmingLanguage.put = function (req, res, next) {
    //TODO : ProgrammingLanguage - Update programmingLanguage
    res.status(404).send('Bulk update of programmingLanguages');
};
exports.programmingLanguage.delete = function (req, res, next) {
    //TODO : ProgrammingLanguage - Remove programmingLanguage
    res.status(404).send('Remove programmingLanguage');
};