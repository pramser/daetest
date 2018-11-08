var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", function(req, res) {
  console.log("hello");
  res.status(200).send({ id: "hello" });
});

router.get("/", function(req, res) {
  console.log("world");
  res.status(200).send({ id: "world" });
});

router.get("/:id", function(req, res) {
  console.log("world");
  res.status(200).send({ id: req.params.id });
});

module.exports = router;
