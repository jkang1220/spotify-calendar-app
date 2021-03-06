var path = require("path");
var SRC_DIR = path.join(__dirname, "/CalendarFrontEnd/src");
var DIST_DIR = path.join(__dirname, "/CalendarFrontEnd/dist");

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: "bundle.js",
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: "babel-loader",
        query: {
          presets: ["react", "env"]
        }
      }
    ]
  }
};
