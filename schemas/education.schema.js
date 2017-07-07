var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var educationSchema = new Schema({
    _id:String,
    label:String,
    description:String,
    entityId:String,
    startDate:Date,
    endDate:Date
});

module.exports = mongoose.model('Education', educationSchema);