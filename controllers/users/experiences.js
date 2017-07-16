var getPagination = require("../../helpers").getPagination;

const Experience = require('../../models/experience.schema');

/* Experiences page. */
exports.get = function (req, res, next) {
    //TODO : Experiences - Handle options
    var pagination = getPagination(req);
    Experience
        .find({user: req.params.id})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, experiences) {
            if (err) return next(err);
            res.json({data: experiences});
        });
};
exports.post = function (req, res, next) {
    //TODO : Experiences - Create experience for user
    res.status(404).send('Create a new Experience for user : '+req.params.id);
};
exports.put = function (req, res, next) {
    //TODO : Experiences - Add Bulk update for user
    res.status(404).send('Bulk update of experiences for user : '+req.params.id);
};
exports.delete = function (req, res, next) {
    //TODO : Experiences - Remove all experiences for user
    res.status(404).send('Remove all experiences for user : '+req.params.id);
};