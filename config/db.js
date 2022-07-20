'use strict';

const mongoose = require('mongoose');
const config = require('../config.js');

// Connection string
const dbURI = `mongodb://${config.get("db.username")}:${config.get("db.pass")}@${config.get("db.host")}`;

// Create the database connection
mongoose.connect(dbURI, {useNewUrlParser: true, poolSize: config.get("db.pool"), dbName: config.get("db.name"), reconnectTries: 20, reconnectInterval: 1000 });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Successful database connection!!!');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose connection disconnected through app termination');
        process.exit(0);
    });
});

require('../models/vote');
require('../models/area');
require('../models/user');
module.exports = mongoose;
