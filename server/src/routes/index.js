const express = require('express');
const user = require('./userRoute');
const review = require('./reviewRoute');

const router = express.Router();

// /api/user
router.use('/user', user);

// /api/review
router.use('/review', review);

module.exports = router;
