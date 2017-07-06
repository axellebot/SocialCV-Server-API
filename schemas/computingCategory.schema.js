var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var computingCategorySchema = new Schema({
    _id:String,
    label:String,
    icon:String
});

module.exports = mongoose.model('ComputingCategory', computingCategorySchema);