var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = global.constants.COLLECTION.COLLECTION_SOFTWARE_FRAMEWORK;

var SoftwareFrameworkSchema = new Schema({
    _id: {type: String, default: uuid},
    label:String,
    user: {type: String, ref: global.constants.COLLECTION.COLLECTION_USER}
},{
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, SoftwareFrameworkSchema);