var getPagination = require("../../helpers").getPagination;

const OperatingSystem = require('../../models/operatingSystem.schema');

/* OperatingSystems page. */
exports.get = function (req, res, next) {
    //TODO : OperatingSystems - Handle options
    var pagination = getPagination(req);
    OperatingSystem
        .find({user: req.params.id})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, operatingSystems) {
            if (err) return next(err);
            res.json({data: operatingSystems});
        });
};
exports.post = function (req, res, next) {
    //TODO : OperatingSystems - Create operatingSystem for user
    res.status(404).send('Create a new OperatingSystem for user : '+req.params.id);
};
exports.put = function (req, res, next) {
    //TODO : OperatingSystems - Add Bulk update for user
    res.status(404).send('Bulk update of operatingSystems for user : '+req.params.id);
};
exports.delete = function (req, res, next) {
    //TODO : OperatingSystems - Remove all operatingSystems for user
    res.status(404).send('Remove all operatingSystems for user : '+req.params.id);
};