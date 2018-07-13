// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const morgan = require('morgan');

const sessionStore = new session.MemoryStore();

// Require models for syncing
const db = require('./models');

// Express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport
app.use(
    session({ secret: 'driverLogger', store: sessionStore, resave: true, saveUninitialized: true })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

// Routes
require('./routes/html-routes.js')(app, passport);
require('./routes/api-routes.js')(app);
require('./config/passport.js')(passport, db.user);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on http://localhost: ${PORT}`);
  });
});
