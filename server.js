var express = require('express');
var app = express();

var Settings = require('./settings');
const Models = require('./models/');

app.get('/', function(req, res) {
  res.status(200).send({
    id: 'homepage'
  });
});

var results_controller = require('./controllers/results_controller');
app.use('/results', results_controller);

var coverage_controller = require('./controllers/coverage_controller');
app.use('/coverage', coverage_controller);

Models.sequelize.sync().then(() => {
  app.listen(Settings.port, () => {
    console.log(`Server running on port ${Settings.port}`);
  });
});
