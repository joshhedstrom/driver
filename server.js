const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/driver_db',
  { useNewUrlParser: true }
);

app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`App listening on http://localhost: ${PORT}`);
});
