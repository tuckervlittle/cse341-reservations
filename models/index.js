const mongoose = require('mongoose');
const dbConfig = require('../config/db.js');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// Register models
db.users = require("./user")(mongoose);
db.areas = require("./area")(mongoose);
db.reservations = require("./reservation")(mongoose);
db.calendar = require("./calendar")(mongoose);

module.exports = db;

// Group: This file loads mongoose and connects all database models