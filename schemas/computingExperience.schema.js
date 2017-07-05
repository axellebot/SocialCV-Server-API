var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var computingExperienceSchema = new Schema({
    label:String,
    description:String,
    entityId:String,
    startDate:Date,
    endDate:Date
});

module.exports = mongoose.model('ComputingExperience', computingExperienceSchema);