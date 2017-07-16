var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = global.constants.COLLECTION.COLLECTION_EXPERIENCE;

var ExperienceSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    description: String,
    entity: {type: String, ref: global.constants.COLLECTION.COLLECTION_ENTITY},
    startDate: Date,
    endDate: Date,
    user: {type: String, ref: global.constants.COLLECTION.COLLECTION_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, ExperienceSchema);