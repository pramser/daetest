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
  res.status(200).send({ id: 'coverage post' });
});

/**
 * GET: Coverage
 */
router.get('/', function(req, res) {
  console.log('coverage get');
  res.status(200).send({ id: 'coverage get' });
});

/**
 * GET: Coverage by Date
 */
router.get('/:date', function(req, res) {
  console.log('coverage by date');
  res.status(200).send({ date: req.params.date });
});

module.exports = router;
