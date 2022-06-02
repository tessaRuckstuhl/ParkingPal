const router = require('express').Router();
const userController = require('../controllers/userController');

const { isAuthenticated, signup } = require('../middlewares');

// api/user
router.get('/', (req, res) => {
  res.send({
    message: '💻'
  });
});
// api/user/signup
router.post('/signup', signup, userController.signup);

// api/user/login
router.post('/login', userController.login);

// api/user/dashboard
router.get('/dashboard', isAuthenticated, userController.findByID);

module.exports = router;
