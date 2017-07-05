var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
    uri:String,
    categoryId:String
});

module.exports = mongoose.model('Link', linkSchema);