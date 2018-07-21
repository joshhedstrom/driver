const router = require('express').Router();
const driverRoutes = require('./driverRoutes');

router.use('/healthTracker', driverRoutes);

module.exports = router;
