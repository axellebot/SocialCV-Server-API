var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var computingCategorySchema = new Schema({
    label:String,
    icon:String
});

module.exports = mongoose.model('ComputingCategory', computingCategorySchema);