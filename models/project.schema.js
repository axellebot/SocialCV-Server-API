var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    label:String,
    description:String,
    computingTag:[{ type: Schema.Types.ObjectId, ref: 'ComputingTag' }],
    programmingLanguages:[{ type: Schema.Types.ObjectId, ref: 'ProgrammingLanguage' }],
    frameworks:[{ type: Schema.Types.ObjectId, ref: 'Framework' }],
    platforms:[{ type: Schema.Types.ObjectId, ref: 'Platform' }],
    links:[{ type: Schema.Types.ObjectId, ref: 'Link' }]
},{
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);