var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var FrameworkTagSchema = new Schema({
    label: String,
    icon: String
}, {
    timestamps: true
});

module.exports = mongoose.model('FrameworkTag', FrameworkTagSchema);