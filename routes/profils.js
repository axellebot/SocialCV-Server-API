var express = require('express');
var router = express.Router();

var utils = require("../utils");

const Profil = require('../schemas/profile.schema');

/* Profils page. */
var PATH_PROFILS = "/";
router
    .get(PATH_PROFILS, function (req, res, next) {
        //TODO : Profils - Handle options
        var pagination = utils.getPagination(req);

        Profil
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, profils) {
                if (err) return res.status(404).send(err);
                res.json({data:profils});
            });
    })
    .post(PATH_PROFILS, function (req, res, next) {
        //TODO : Profils - Create profil
        res.status(404).send('Create a Profil');
    })
    .put(PATH_PROFILS, function (req, res, next) {
        //TODO : Profils - Add Bulk update
        res.status(404).send('Bulk update of profils');
    })
    .delete(PATH_PROFILS, function (req, res, next) {
        //TODO : Profils - Remove all profils
        res.status(404).send('Remove all profils');
    });

/* Profil page. */
var PATH_PROFIL = PATH_PROFILS + ":id";
router
    .get(PATH_PROFIL, function (req, res, next) {
        Profil
            .findById(req.params.id)
            .exec(function (err, profil) {
                if (err) return res.status(404).send(err);
                res.json({data:profil});
            });
    })
    .post(PATH_PROFIL, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_PROFIL, function (req, res, next) {
        //TODO : Profil - Update profil
        res.status(404).send('Bulk update of profils');
    })
    .delete(PATH_PROFILS, function (req, res, next) {
        //TODO : Profil - Remove profil
        res.status(404).send('Remove profil');
    });

module.exports = router;