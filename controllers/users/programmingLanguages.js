var getPagination = require("../../helpers").getPagination;

const ProgrammingLanguage = require('../../models/programmingLanguage.schema');

/* ProgrammingLanguages page. */
exports.get = function (req, res, next) {
    //TODO : ProgrammingLanguages - Handle options
    var pagination = getPagination(req);
    ProgrammingLanguage
        .find({user: req.params.id})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, programmingLanguages) {
            if (err) return next(err);
            res.json({data: programmingLanguages});
        });
};
exports.post = function (req, res, next) {
    //TODO : ProgrammingLanguages - Create programmingLanguage for user
    res.status(404).send('Create a new ProgrammingLanguage for user : ' + req.params.id);
};
exports.put = function (req, res, next) {
    //TODO : ProgrammingLanguages - Add Bulk update for user
    res.status(404).send('Bulk update of programmingLanguages for user : ' + req.params.id);
};
exports.delete = function (req, res, next) {
    //TODO : ProgrammingLanguages - Remove all programmingLanguages for user
    res.status(404).send('Remove all programmingLanguages for user : ' + req.params.id);
};