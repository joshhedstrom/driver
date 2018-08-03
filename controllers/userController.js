const db = require('../models');
const moment = require('moment');

module.exports = {
  findUserById: function(req, res) {
    db.User.findByIdAndUpdate({ _id: req.params.id })
      .select('-__v -password')
      .populate({
        path: "trips",
        options: {
          sort: {
            date: -1
          }
        },
        select: "-__v",
        populate: {
          path: "trips",
          model: "Trip",
          select: "-__v"
        }
      })
      .then(userModel => res.json(userModel))
      .catch(err => res.status(422).json(err));
  },

  // findUserById: function (req, res) {
  //   let id = req.params.id
  //   db.User.findOne({ _id: id })
  //     .then(userModel => res.json(userModel))
  //     .catch(err => res.status(422).json(err))
  // },

  createUser: function(req, res) {
    db.User.create(req.body)
      .then(userModel => res.json(userModel))
      .catch(err => res.status(422).json(err));
  },

  updateUser: function(req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeUser: function(req, res) {
    db.User.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
