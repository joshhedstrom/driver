const router = require('express').Router();
const db = require('../../controllers');
const passport = require('passport');
require('../../config/passport')(passport);

// NEW TRIP
router.post(
  '/newTrip',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      db.Trip.createTrip(req, res);
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }
);

// GET ALL USER DATA
router.get(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      db.User.findUserById(req, res);
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }
);

//EDIT USER MODEL
router.patch(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      db.User.updateUser(req, res);
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }
);

//UPDATE TRIP
router.put(
  '/updateTrip/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      db.Trip.updateTrip(req, res);
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }
);

//GET TRIP TO EDIT
router.get(
  '/getTrip/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      db.Trip.findTripById(req, res);
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }
);

//DELETE TRIP
router.delete(
  '/deleteTrip/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      db.Trip.removeTrip(req, res);
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }
);

// GETS ALL PAST TRIPS FOR USER
router.get(
  '/getTrips/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      db.Trip.findAllTrips(req, res);
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }
);

getToken = function(headers) {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports = router;
