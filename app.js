var express = require("express");
var app = express();

var coverage_controller = require("./controllers/coverage_controller");
app.use("/results", coverage_controller);

module.exports = app;
