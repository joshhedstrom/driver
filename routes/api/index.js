const router = require('express').Router();
const driverRoutes = require('./driverRoutes');

router.use('/driverRoutes', driverRoutes);

module.exports = router;
