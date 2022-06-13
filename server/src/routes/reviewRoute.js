const router = require('express').Router();
const reviewController = require('../controllers/reviewController');

const { isAuthenticated, signup } = require('../middlewares');

// api/review
router.get('/review', (req, res) => {
  res.send({
    message: '💻'
  });
});

// api/review/parkingspace
router.post('/parkingSpace', reviewController.createReviewParkingSpace);

// api/review/user
router.post('/user', reviewController.createReviewUser);

// api/review/
router.get('/:id', reviewController.findByID);

// api/review/
router.put('/:id', reviewController.updateById);

// api/review/
router.delete('/:id', reviewController.deleteById);

// Return all reviews that match the user or parkingspace id
// Necessary?
// api/review/all
router.get('/all/:id', reviewController.getReviewList);

module.exports = router;
