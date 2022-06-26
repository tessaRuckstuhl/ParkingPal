const express = require('express');
const user = require('./userRoute');
const userReview = require('./userReviewRoute');
const parkingSpaceReview = require('./parkingSpaceReviewRoute');
const parkingSpace = require('./parkingSpaceRoute')

const router = express.Router();

// /api/user
router.use('/user', user);
// /api/parkingspace
router.use('/parkingspace', parkingSpace)
// /api/user-review
router.use('/user-review', userReview);
// /api/parkingspace-review
router.use('/parkingspace-review', parkingSpaceReview);

module.exports = router;
