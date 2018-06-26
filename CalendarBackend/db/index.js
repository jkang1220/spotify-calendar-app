var mongoose = require("mongoose");
// mongoose.connect(
//   `mongodb://${process.env.DB_USERNAME}:${
//     process.env.DB_PASSWORD
//   }@ds117701.mlab.com:17701/spotify-calendar`
// );
mongoose.connect("mongodb://localhost/calendar");

var db = mongoose.connection;

db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connected successfully");
});

module.exports = { mongoose };
