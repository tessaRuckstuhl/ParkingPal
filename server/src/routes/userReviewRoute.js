const router = require('express').Router();
const userReviewController = require('../controllers/userReviewController');


// api/review/
router.post('/', userReviewController.createReview);

// api/review/
router.get('/:id', userReviewController.findByID);

// api/review/
router.put('/:id', userReviewController.updateById);

// api/review/
router.delete('/:id', userReviewController.deleteById);

module.exports = router;
