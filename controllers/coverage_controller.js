// Dependencies
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Models
const Models = require('../models/');

// Inits
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/**
 * POST: Coverage
 */
router.post('/', function(req, res) {
  console.log('coverage post');

  var new_coverage = req.body;

  Models.Coverage.create({
    date: new Date(),
    product: new_coverage.product,
    content: new_coverage.content
  }).then(coverage => {
    res.status(200).send({ coverage });
  });
});

/**
 * GET: Coverage
 */
router.get('/', function(req, res) {
  console.log('coverage get');

  Models.Coverage.findAll({
    order: [['date', 'DESC']]
  }).then(coverage => {
    res.status(200).send({ coverage });
  });
});

/**
 * GET: Coverage by Date
 */
router.get('/:date', function(req, res) {
  console.log('coverage by date');
  res.status(200).send({ date: req.params.date });
});

module.exports = router;
