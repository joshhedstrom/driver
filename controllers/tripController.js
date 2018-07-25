const db = require('../models');
const moment = require('moment');

module.exports = {
  // User controllers
  findTripById: function(req, res) {
    db.User.findByIdAndUpdate({ _id: req.params.id })
      .select('-__v -password')
      .populate({
        path: 'days',
        options: {
          sort: {
            date: -1
          }
        },
        select: '-__v',
        populate: {
          path: 'exercises',
          model: 'Exercise',
          select: '-__v'
        }
      })
      .then(userModel => res.json(userModel))
      .catch(err => res.status(422).json(err));
  },

  createTrip: function(req, res) {
    db.Trip.create(req.body)
      .then(tripModel => res.json(tripModel))
      .catch(err => res.status(422).json(err));
  },

  updateTrip: function(req, res) {
    db.Trip.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeTrip: function(req, res) {
    db.Trip.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
