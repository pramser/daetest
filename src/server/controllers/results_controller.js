// Dependencies
var express = require("express");
var router = express.Router();

// Models
const Models = require("../models/");

/**
 * POST: Results
 */
router.post("/", function(req, res) {
  var product_name = req.header("x-product-name");
  var product_type = req.header("x-product-type");

  var n_result = [
    { testName: "test_did_something_well", isPassed: true },
    { testName: "test_did_something_poor", isPassed: false }
  ];

  Models.Result.create({
    date: new Date(),
    content: n_result,
    product: product_name,
    type: product_type,
    total: n_result ? n_result.length : 0 // TODO: Fix this.
  }).then(result => {
    res.status(200).send({ result });
  });
});

/**
 * GET: Results
 */
router.get("/", function(req, res) {
  console.log("results get");

  Models.Result.findAll({
    order: [["date", "DESC"]]
  }).then(results => {
    res.status(200).send({ results });
  });
});

/**
 * GET: Results by Date
 */
router.get("/:date", function(req, res) {
  console.log("results by date");
  res.status(200).send({ date: req.params.date });
});

module.exports = router;
