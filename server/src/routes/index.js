const express = require('express');
const user = require('./userRoute');
const booking = require('./bookingRoute');
const review = require('./reviewRoute');
const parkingSpace = require('./parkingSpaceRoute')
const images = require('./imagesRoute')


const router = express.Router();

// /api/user
router.use('/user', user);
// /api/booking
router.use('/booking', booking);
// /api/images
router.use('/images', images)
// /api/parkingspace
router.use('/parkingspace', parkingSpace);
// /api/images
router.use('/images', images)
// /api/review
router.use('/review', review);

module.exports = router;
