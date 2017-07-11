var express = require('express');
var router = express.Router();

var utils = require("../helpers");

const Link = require('../models/link.schema');

/* Links page. */
var PATH_LINKS = "/";
router
    .get(PATH_LINKS, function (req, res, next) {
        //TODO : Links - Handle options
        var pagination = utils.getPagination(req);

        Link
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, links) {
                if (err) return next(err);
                res.json({data:links});
            });
    })
    .post(PATH_LINKS, function (req, res, next) {
        //TODO : Links - Create link
        res.status(404).send('Create a Link');
    })
    .put(PATH_LINKS, function (req, res, next) {
        //TODO : Links - Add Bulk update
        res.status(404).send('Bulk update of links');
    })
    .delete(PATH_LINKS, function (req, res, next) {
        //TODO : Links - Remove all links
        res.status(404).send('Remove all links');
    });

/* Link page. */
var PATH_LINK = PATH_LINKS + ":id";
router
    .get(PATH_LINK, function (req, res, next) {
        Link
            .findById(req.params.id)
            .exec(function (err, link) {
                if (err) return next(err);                res.json({data:link});
            });
    })
    .post(PATH_LINK, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_LINK, function (req, res, next) {
        //TODO : Link - Update link
        res.status(404).send('Bulk update of links');
    })
    .delete(PATH_LINKS, function (req, res, next) {
        //TODO : Link - Remove link
        res.status(404).send('Remove link');
    });

module.exports = router;