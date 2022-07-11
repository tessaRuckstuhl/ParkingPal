const router = require('express').Router();
const reviewController = require('../controllers/reviewController');

const { isAuthenticated, signup } = require('../middlewares');

// api/helperReview/
router.get('/:id', reviewController.getReviewStats);

module.exports = router;
