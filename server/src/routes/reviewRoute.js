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
router.post('/', reviewController.createReview);

// api/review/read
router.get('/:id', reviewController.findByID);

// api/review/update
router.put('/:id', reviewController.updateById);

// api/review/delete
router.delete('/:id', reviewController.deleteById);

module.exports = router;
