const express = require('express');
const user = require('./userRoute');
const booking = require('./bookingRoute');
const parkingSpace = require('./parkingSpaceRoute')


const router = express.Router();

// /api/user
router.use('/user', user);
// /api/booking
router.use('/booking', booking);
// /api/parkingspace
router.use('/parkingspace', parkingSpace);

module.exports = router;
