var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var ExperienceSchema = new Schema({
    _id: {type: String, default: uuid},
    user:{ type: String, ref: 'User' },
    label:String,
    description:String,
    entity: {type: String, ref: 'Entity'},
    startDate:Date,
    endDate:Date
},{
    timestamps: true
});

module.exports = mongoose.model('Experience', ExperienceSchema);