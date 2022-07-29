const router = require('express').Router();
const reviewController = require('../controllers/reviewController');


// api/review/
router.post('/', reviewController.createReview);

// api/review/
router.get('/:id', reviewController.findByID);

// api/review/
router.patch('/:id', reviewController.updateReview);


// api/review/
router.delete('/:id', reviewController.deleteById);

module.exports = router;
