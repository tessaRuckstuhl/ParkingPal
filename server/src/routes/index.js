const express = require('express');
const user = require('./userRoute');

const router = express.Router();

// /api/user
router.use('/user', user);

module.exports = router;
