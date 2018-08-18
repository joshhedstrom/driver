const db = require('../models');
const moment = require('moment');

module.exports = {
  findAllTrips: function(req, res) {
    db.Trip.find({ userId: req.params.userId })
      .then(tripsModel => res.json(tripsModel))
      .catch(err => res.status(422).json(err));
  },

  findTripById: function(req, res) {
    let id = req.params.id
    db.Trip.findOne({ _id: id })
      .then(tripsModel =>{

        console.log(tripsModel)
        res.json(tripsModel)
      } 
    )
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
