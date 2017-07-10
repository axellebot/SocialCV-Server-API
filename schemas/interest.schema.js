var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var InterestSchema = new Schema({
    label:String,
    description:String
},{
    timestamps: true
});

module.exports = mongoose.model('Interest', InterestSchema);