var getPagination = require("../../helpers").getPagination;

const Entity = require('../../models/entity.schema');

/* Entities page. */
exports.get = function (req, res, next) {
    //TODO : Entities - Handle options
    var pagination = getPagination(req);

    Entity
        .find({user: req.params.id})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, entities) {
            if (err) return next(err);
            res.json({data: entities});
        });
};
exports.post = function (req, res, next) {
    //TODO : Entities - Create entity for user
    res.status(404).send('Create a new Entity for user : '+req.params.id);
};
exports.put = function (req, res, next) {
    //TODO : Entities - Add Bulk update for user
    res.status(404).send('Bulk update of entities for user : '+req.params.id);
};
exports.delete = function (req, res, next) {
    //TODO : Entities - Remove all entities for user
    res.status(404).send('Remove all entities for user : '+req.params.id);
};