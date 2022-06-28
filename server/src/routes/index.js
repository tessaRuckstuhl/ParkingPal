const express = require('express');
const user = require('./userRoute');
const booking = require('./bookingRoute');
const userReview = require('./userReviewRoute');
const parkingSpaceReview = require('./parkingSpaceReviewRoute');
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
// /api/user-review
router.use('/user-review', userReview);
// /api/parkingspace-review
router.use('/parkingspace-review', parkingSpaceReview);

module.exports = router;
