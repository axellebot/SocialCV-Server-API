var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var ComputingTagSchema = new Schema({
    label:String,
    icon:String
},{
    timestamps: true
});

module.exports = mongoose.model('ComputingTag', ComputingTagSchema);