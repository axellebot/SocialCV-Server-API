var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var ProjectTagSchema = new Schema({
    label: String,
    icon: String
}, {
    timestamps: true
});

module.exports = mongoose.model('ProjectTag', ProjectTagSchema);