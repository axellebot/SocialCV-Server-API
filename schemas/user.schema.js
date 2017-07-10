var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: String,
    name: String,
    password: String,
    admin: Boolean
});

module.exports = mongoose.model('User', userSchema);