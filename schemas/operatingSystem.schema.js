var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var OperatingSystemSchema = new Schema({
    label:String
},{
    timestamps: true
});

module.exports = mongoose.model('OperatingSystem', OperatingSystemSchema);