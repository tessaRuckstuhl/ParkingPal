const express = require('express');
const user = require('./userRoute');
const review = require('./reviewRoute');
const parkingSpace = require('./parkingSpaceRoute')

const router = express.Router();

// /api/user
router.use('/user', user);
// /api/parkingspace
router.use('/parkingspace', parkingSpace)
// /api/review
router.use('/review', review);

module.exports = router;
