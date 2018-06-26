var mongoose = require("mongoose");

const connectionString =
  process.env.DB_USERNAME !== undefined
    ? `mongodb://${process.env.DB_USERNAME}:${
        process.env.DB_PASSWORD
      }@ds117701.mlab.com:17701/spotify-calendar`
    : "mongodb://localhost/calendar";

mongoose.connect(connectionString);

var db = mongoose.connection;

db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connected successfully");
});

module.exports = { mongoose };
