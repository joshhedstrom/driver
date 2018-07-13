const path = require('path');
const db = require('../models');

var exports = (module.exports = {});

exports.login = (req, res) => {
  console.log('MESSSAGE:: ', req.flash('message'));
  res.sendFile(path.join(__dirname, '../public/index.html'));
};

exports.user = (req, res) => {
  console.log(req.flash('message'));
  res.json({
    id: req.user.id,
    username: req.user.username
  });
};

exports.dashboard = (req, res) => {
  console.log(req.flash('message'));
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    res.redirect('/');
  });
};
