var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var computingPlatformSchema = new Schema({
    _id:String,
    label:String,
    computingPlatformCategoryId:String
});

module.exports = mongoose.model('ComputingPlatform', computingPlatformSchema);