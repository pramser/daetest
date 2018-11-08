var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', function(req, res) {
  console.log('coverage post');
  res.status(200).send({ id: 'coverage post' });
});

router.get('/', function(req, res) {
  console.log('coverage get');
  res.status(200).send({ id: 'coverage get' });
});

router.get('/:id', function(req, res) {
  console.log('coverage by id');
  res.status(200).send({ id: req.params.id });
});

module.exports = router;
