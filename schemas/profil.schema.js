var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var profilSchema = new Schema({
    _id:String,
    firstName:String,
    lastname:String,
    address:String,
    linkIds:[String]
});

module.exports = mongoose.model('Profil', profilSchema);