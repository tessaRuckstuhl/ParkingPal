const router = require('express').Router();
const reviewController = require('../controllers/reviewController');

const { isAuthenticated, signup } = require('../middlewares');

// api/helperReview/
router.get('/:id', reviewController.getReviewStats);

// api/helperReview/
// no post - but want to use same endpoint
router.post('/:id', reviewController.getReviewsForParkingSpace);

// api/helperReview/
// no put - but want to use same endpoint
router.put('/:id', reviewController.listOwnedReviews);


module.exports = router;
