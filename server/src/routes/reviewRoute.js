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
router.post('/create', create, reviewController.create);

// api/review/read
router.get('/read', reviewController.read);

// api/review/update
router.put('/update', reviewController.update);

// api/review/delete
router.delete('/delete', reviewController.delete);

module.exports = router;
