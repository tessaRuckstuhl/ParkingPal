const router = require('express').Router();
const reviewController = require('../controllers/reviewController');

const { isAuthenticated, signup } = require('../middlewares');

// api/review
router.get('/review', (req, res) => {
  res.send({
    message: '💻'
  });
});

// api/review/create
router.post('/create', reviewController.createReview);

// api/review/read
router.get('/read', reviewController.readReview);

// api/review/update
//router.put('/update', reviewController.updateR);

// api/review/delete
router.delete('/delete', reviewController.deleteReview);

module.exports = router;
