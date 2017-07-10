var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var ExperienceSchema = new Schema({
    label:String,
    description:String,
    entity: {type: Schema.Types.ObjectId, ref: 'Entity'},
    startDate:Date,
    endDate:Date
},{
    timestamps: true
});

module.exports = mongoose.model('Experience', ExperienceSchema);