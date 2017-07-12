var getPagination = require("../helpers").getPagination;

const Profil = require('../models/profile.schema');

/* Profils page. */
exports.profils = {};
exports.profils.get = function (req, res, next) {
    //TODO : Profils - Handle options
    var pagination = getPagination(req);
    Profil
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, profils) {
            if (err) return next(err);
            res.json({data: profils});
        });
};
exports.profils.post = function (req, res, next) {
    //TODO : Profils - Create profil
    res.status(404).send('Create a Profil');
};
exports.profils.put = function (req, res, next) {
    //TODO : Profils - Add Bulk update
    res.status(404).send('Bulk update of profils');
};
exports.profils.delete = function (req, res, next) {
    //TODO : Profils - Remove all profils
    res.status(404).send('Remove all profils');
};

/* Profil page. */
exports.profil = {};
exports.profil.get = function (req, res, next) {
    Profil
        .findById(req.params.id)
        .exec(function (err, profil) {
            if (err) return next(err);
            res.json({data: profil});
        });
};
exports.profil.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.profil.put = function (req, res, next) {
    //TODO : Profil - Update profil
    res.status(404).send('Bulk update of profils');
};
exports.profil.delete = function (req, res, next) {
    //TODO : Profil - Remove profil
    res.status(404).send('Remove profil');
};