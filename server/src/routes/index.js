const express = require('express');
const user = require('./userRoute');
const parkingSpace = require('./parkingSpaceRoute')

const router = express.Router();

// /api/user
router.use('/user', user);
// /api/parkingspace
router.use('/parkingSpace', parkingSpace)

module.exports = router;
