var express = require('express');
var router = express.Router();

var utils = require("../helpers");

const LinkTag = require('../models/linkTag.schema');

/* Links page. */
var PATH_LINK_TAGS = "/";
router
    .get(PATH_LINK_TAGS, function (req, res, next) {
        //TODO : LinkTags - Handle options
        var pagination = utils.getPagination(req);

        LinkTag
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, linkTags) {
                if (err) return next(err);                res.json({data:linkTags});
            });
    })
    .post(PATH_LINK_TAGS, function (req, res, next) {
        //TODO : LinkTags - Create link
        res.status(404).send('Create a LinkTag');
    })
    .put(PATH_LINK_TAGS, function (req, res, next) {
        //TODO : LinkTags - Add Bulk update
        res.status(404).send('Bulk update of links');
    })
    .delete(PATH_LINK_TAGS, function (req, res, next) {
        //TODO : LinkTags - Remove all links
        res.status(404).send('Remove all links');
    });

/* LinkTag page. */
var PATH_LINK_TAG = PATH_LINK_TAGS + ":id";
router
    .get(PATH_LINK_TAG, function (req, res, next) {
        LinkTag
            .findById(req.params.id)
            .exec(function (err, linkTag) {
                if (err) return next(err);                res.json({data:linkTag});
            });
    })
    .post(PATH_LINK_TAG, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_LINK_TAG, function (req, res, next) {
        //TODO : LinkTag - Update link
        res.status(404).send('Bulk update of links');
    })
    .delete(PATH_LINK_TAGS, function (req, res, next) {
        //TODO : LinkTag - Remove link
        res.status(404).send('Remove link');
    });

module.exports = router;