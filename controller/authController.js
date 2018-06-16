const path = require('path');
const db = require('../models')

var exports = module.exports = {}

exports.login = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
}

exports.user = (req, res) => {
    res.json({
        'id': req.user.id,
        'username': req.user.username
    })
}

exports.dashboard = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/main.html"));
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}