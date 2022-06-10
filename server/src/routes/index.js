const express = require('express');
const user = require('./userRoute');
const booking = require('./bookingRoute');

const router = express.Router();

// /api/user
router.use('/user', user);
router.use('/booking', booking);

module.exports = router;
