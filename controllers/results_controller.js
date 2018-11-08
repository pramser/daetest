var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', function(req, res) {
  console.log('results post');
  res.status(200).send({ id: 'results post' });
});

router.get('/', function(req, res) {
  console.log('results get');
  res.status(200).send({ id: 'results get' });
});

router.get('/:id', function(req, res) {
  console.log('results by id');
  res.status(200).send({ id: req.params.id });
});

module.exports = router;
