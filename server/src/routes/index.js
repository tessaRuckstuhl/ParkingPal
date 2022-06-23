const express = require('express');
const user = require('./userRoute');
const parkingSpace = require('./parkingSpaceRoute')
const images = require('./imagesRoute')

const router = express.Router();

// /api/user
router.use('/user', user);
// /api/parkingspace
router.use('/parkingspace', parkingSpace)
// /api/images
router.use('/images', images)

module.exports = router;
