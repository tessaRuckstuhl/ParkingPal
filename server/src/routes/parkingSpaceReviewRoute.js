const router = require('express').Router();
const parkingSpaceReviewController = require('../controllers/parkingSpaceReviewController');


// api/review/
router.post('/', parkingSpaceReviewController.createReview);

// api/review/
router.get('/:id', parkingSpaceReviewController.findByID);

// api/review/
router.put('/:id', parkingSpaceReviewController.updateById);

// api/review/
router.delete('/:id', parkingSpaceReviewController.deleteById);

module.exports = router;
