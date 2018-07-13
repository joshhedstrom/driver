const path = require('path');
const authController = require('../controller/authController.js');

module.exports = (app, passport) => {
  app.get('/login', authController.login);

  app.get('/user', isLoggedIn, authController.user);

  app.get('/logout', authController.logout);

  app.get('/dashboard', isLoggedIn, authController.dashboard);

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/user',
      failureRedirect: '/signup'
    })
  );

  app.post(
    '/login',
    passport.authenticate('local-signin', {
      successRedirect: '/user',
      failureRedirect: '/login'
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/login');
  }
};
