const router = require('express').Router();
const driverRoutes = require('./driverRoutes.js');

router.use('/', driverRoutes);

module.exports = router;
