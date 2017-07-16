var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var SoftwareFrameworkSchema = new Schema({
    _id: {type: String, default: uuid},
    label:String
},{
    timestamps: true
});

module.exports = mongoose.model('SoftwareFramework', SoftwareFrameworkSchema);