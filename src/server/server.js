// Dependencies
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

// Locals
var Settings = require("./settings");
const Models = require("./models");

// Set-up some basic dependencies...
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Root mapped to '$/'
// TODO: Is this necessary for simple API documentation?
app.get("/", function(req, res) {
  res.status(200).send({
    id: "homepage"
  });
});

// Results mapped to '$/results'
var results_controller = require("./controllers/results_controller");
app.use("/results", results_controller);

// Coverage mapped to '$/coverage'
var coverage_controller = require("./controllers/coverage_controller");
app.use("/coverage", coverage_controller);

// Colors for my console.log()
var colors = require("colors");

// Kick-off SQLite synchronization...
Models.sequelize.sync().then(() => {
  // Init server.
  app.listen(Settings.port, () => {
    console.clear();
    console.log(`Server running on port ${Settings.port}...`.green);
  });
});
