var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var computingPlatformCategorySchema = new Schema({
    label:String
});

module.exports = mongoose.model('ComputingPlatformCategory', computingPlatformCategorySchema);