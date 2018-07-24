const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const db = require('./models');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/driver_db');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(morgan('dev'));
// require('./routes/html-routes.js')(app, passport);
// require('./routes/api-routes.js')(app);
// require('./config/passport.js')(passport, db.user);
// app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on http://localhost: ${PORT}`);
});
