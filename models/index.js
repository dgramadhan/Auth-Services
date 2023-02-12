const dbConn = require("../config/auth.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConn.url_mongo;
db.Users = require("./user.model")(mongoose)


module.exports = db;