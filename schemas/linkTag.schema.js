var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var LinkTagSchema = new Schema({
    label:String,
    icon:String
},{
    timestamps: true
});

module.exports = mongoose.model('LinkTag', LinkTagSchema);