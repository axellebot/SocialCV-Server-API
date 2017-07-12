var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var EntitySchema = new Schema({
    label: String,
    description: String,
    address: String,
    links: [{type: Schema.Types.ObjectId, ref: 'Link'}]
},{
    timestamps: true
});

module.exports = mongoose.model('Entity', EntitySchema);