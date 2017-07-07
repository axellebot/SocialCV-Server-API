var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var softwareFrameworkSchema = new Schema({
    _id:String,
    label:String
});

module.exports = mongoose.model('SoftwareFramework', softwareFrameworkSchema);