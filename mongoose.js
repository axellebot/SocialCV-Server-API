"use strict";

var mongoose = require("mongoose");
//Fixing promises
mongoose.Promise = global.Promise;

var options = 
mongoose.connect(config.database.uri, {
	dbName: config.database.name,
	user: config.database.username,
	pass: config.database.password,
	useMongoClient: true,
	autoReconnect: true,
	reconnectTries: 10, // Never stop trying to reconnect
	reconnectInterval: 500
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	console.log("database opened on :", config.database.uri);
});

module.exports = mongoose;