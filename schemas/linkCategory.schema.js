var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var linkCategorySchema = new Schema({
    _id:String,
    label:String,
    icon:String
});

module.exports = mongoose.model('LinkCategory', linkCategorySchema);