var getPagination = require("../../helpers").getPagination;

const Education = require('../../models/education.schema');

/* Educations page. */
exports.get = function (req, res, next) {
    //TODO : Educations - Handle options
    var pagination = getPagination(req);

    Education
        .find({user: req.params.id})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, educations) {
            if (err) return next(err);
            res.json({data: educations});
        });
};
exports.post = function (req, res, next) {
    //TODO : Educations - Create education for user
    res.status(404).send('Create a new Education for user : '+req.params.id);
};
exports.put = function (req, res, next) {
    //TODO : Educations - Add Bulk update for user
    res.status(404).send('Bulk update of educations for user : '+req.params.id);
};
exports.delete = function (req, res, next) {
    //TODO : Educations - Remove all educations for user
    res.status(404).send('Remove all educations for user : '+req.params.id);
};