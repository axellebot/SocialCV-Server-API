var getPagination = require("../../helpers").getPagination;

const Language = require('../../models/language.schema');

/* Languages page. */
exports.get = function (req, res, next) {
    //TODO : Languages - Handle options
    var pagination = getPagination(req);
    Language
        .find({user: req.params.id})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, languages) {
            if (err) return next(err);
            res.json({data: languages});
        });
};
exports.post = function (req, res, next) {
    //TODO : Languages - Create language for user
    res.status(404).send('Create a new Language for user : '+req.params.id);
};
exports.put = function (req, res, next) {
    //TODO : Languages - Add Bulk update for user
    res.status(404).send('Bulk update of languages for user : '+req.params.id);
};
exports.delete = function (req, res, next) {
    //TODO : Languages - Remove all languages for user
    res.status(404).send('Remove all languages for user : '+req.params.id);
};