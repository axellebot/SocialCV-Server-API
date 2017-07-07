var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var ExperienceSchema = new Schema({
    _id:String,
    label:String,
    description:String,
    entityId:String,
    startDate:Date,
    endDate:Date
});

module.exports = mongoose.model('Experience', ExperienceSchema);