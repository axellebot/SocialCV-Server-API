var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var SoftwareSchema = new Schema({
    label:String,
    description:String
},{
    timestamps: true
});

module.exports = mongoose.model('Software', SoftwareSchema);