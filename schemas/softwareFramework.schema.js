var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var SoftwareFrameworkSchema = new Schema({
    label:String
},{
    timestamps: true
});

module.exports = mongoose.model('SoftwareFramework', SoftwareFrameworkSchema);