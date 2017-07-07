var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var operatingSystemSchema = new Schema({
    _id:String,
    label:String
});

module.exports = mongoose.model('OperatingSystem', operatingSystemSchema);