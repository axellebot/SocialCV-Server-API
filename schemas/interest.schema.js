var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var interestSchema = new Schema({
    _id:String,
    label:String,
    description:String
});

module.exports = mongoose.model('Interest', interestSchema);