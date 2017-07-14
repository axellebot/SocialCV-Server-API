var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var FrameworkSchema = new Schema({
    label: String,
    frameworkTags: [{type: Schema.Types.ObjectId, ref: 'FrameworkTag'}],
    languageId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Framework', FrameworkSchema);