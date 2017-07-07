var express = require('express');
var router = express.Router();

var utils = require("../utils");

const Framework = require('../schemas/framework.schema');

/* Frameworks page. */
var PATH_FRAMEWORKS = "/";
router
    .get(PATH_FRAMEWORKS, function (req, res, next) {
        //TODO : Frameworks - Handle options
        var pagination = utils.getPagination(req);

        Framework
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, frameworks) {
                if (err) return res.status(404).send(err);
                res.json({data:frameworks});
            });
    })
    .post(PATH_FRAMEWORKS, function (req, res, next) {
        //TODO : Frameworks - Create framework
        res.status(404).send('Create a Framework');
    })
    .put(PATH_FRAMEWORKS, function (req, res, next) {
        //TODO : Frameworks - Add Bulk update
        res.status(404).send('Bulk update of frameworks');
    })
    .delete(PATH_FRAMEWORKS, function (req, res, next) {
        //TODO : Frameworks - Remove all frameworks
        res.status(404).send('Remove all frameworks');
    });

/* Framework page. */
var PATH_FRAMEWORK = PATH_FRAMEWORKS + ":id";
router
    .get(PATH_FRAMEWORK, function (req, res, next) {
        Framework
            .findById(req.params.id)
            .exec(function (err, framework) {
                if (err) return res.status(404).send(err);
                res.json({data:framework});
            });
    })
    .post(PATH_FRAMEWORK, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_FRAMEWORK, function (req, res, next) {
        //TODO : Framework - Update framework
        res.status(404).send('Bulk update of frameworks');
    })
    .delete(PATH_FRAMEWORKS, function (req, res, next) {
        //TODO : Framework - Remove framework
        res.status(404).send('Remove framework');
    });

module.exports = router;