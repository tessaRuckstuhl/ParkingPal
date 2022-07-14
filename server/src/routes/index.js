const express = require('express');
const user = require('./userRoute');
const booking = require('./bookingRoute');
const review = require('./reviewRoute');
const helperReview = require('./helperReviewRoute')
const parkingSpace = require('./parkingSpaceRoute')
const helperParkingSpace = require('./helperParkingSpaceRoute')
const images = require('./imagesRoute')
const { isAuthenticated } = require('../middlewares');


const router = express.Router();

// /api/user
router.use('/user', user);
// /api/booking
router.use('/booking', booking);
// /api/parkingspace
router.use('/parkingspace', parkingSpace);
// /api/review/average
router.use('/helperParkingspace', helperParkingSpace);
// /api/images
router.use('/images', images)
// /api/review
router.use('/review', review);
// /api/review/average
router.use('/helperReview', helperReview);



module.exports = router;
