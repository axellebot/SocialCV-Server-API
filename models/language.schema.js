var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var LanguageSchema = new Schema({
    _id: {type: String, default: uuid},
    user:{ type: String, ref: 'User' },
    label:String,
    description:String
},{
    timestamps: true
});

module.exports = mongoose.model('Language', LanguageSchema);