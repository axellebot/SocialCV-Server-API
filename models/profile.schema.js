var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var ProfileSchema = new Schema({
    _id: {type: String, default: uuid},
    firstName:String,
    lastName:String,
    address:String,
    links:[{ type: String, ref: 'Link' }]
},{
    timestamps: true
});

module.exports = mongoose.model('Profile', ProfileSchema);