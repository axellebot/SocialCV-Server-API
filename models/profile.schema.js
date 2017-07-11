var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    firstName:String,
    lastName:String,
    address:String,
    links:[{ type: Schema.Types.ObjectId, ref: 'Link' }]
},{
    timestamps: true
});

module.exports = mongoose.model('Profile', ProfileSchema);