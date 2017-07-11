var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var FrameworkSchema = new Schema({
    label:String,
    computingCategories:[{ type: Schema.Types.ObjectId, ref: 'ComputingCategory' }],
    languageId:String
},{
    timestamps: true
});

module.exports = mongoose.model('Framework', FrameworkSchema);