var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var SoftwareSchema = new Schema({
    _id: {type: String, default: uuid},
    label:String,
    description:String
},{
    timestamps: true
});

module.exports = mongoose.model('Software', SoftwareSchema);