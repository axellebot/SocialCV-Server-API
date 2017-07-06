var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var computingPlatformSchema = new Schema({
    label:String,
    computingPlatformCategoryId:String
});

module.exports = mongoose.model('ComputingPlatform', computingPlatformSchema);