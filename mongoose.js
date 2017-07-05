var config = require("./config");

var mongoose = require("mongoose");
mongoose.connect(config.database.uri, {useMongoClient: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("database opened");
});

module.exports = mongoose;