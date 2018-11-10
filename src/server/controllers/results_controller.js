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
 * POST: Results
 */
router.post('/', function(req, res) {
  console.log('results post');

  var new_result = req.body;

  Models.Result.create({
    date: new Date(),
    product: new_result.product,
    content: new_result.content
  }).then(result => {
    res.status(200).send({ result });
  });
});

/**
 * GET: Results
 */
router.get('/', function(req, res) {
  console.log('results get');

  Models.Result.findAll({
    order: [['date', 'DESC']]
  }).then(results => {
    res.status(200).send({ results });
  });
});

/**
 * GET: Results by Date
 */
router.get('/:date', function(req, res) {
  console.log('results by date');
  res.status(200).send({ date: req.params.date });
});

module.exports = router;
