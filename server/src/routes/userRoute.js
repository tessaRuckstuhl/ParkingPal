const router = require('express').Router();
const userController = require('../controllers/userController');

const { isAuthenticated, signup } = require('../middlewares');

// api/user
router.get('/:id', isAuthenticated, userController.findByID);

router.delete('/:id', isAuthenticated, userController.deleteById);

router.patch('/:id', isAuthenticated, userController.updateById);

// api/user/signup
router.post('/signup', signup, userController.signup);

// api/user/login
router.post('/login', userController.login);

// api/user/dashboard
router.get('/dashboard', isAuthenticated, userController.findByID);

module.exports = router;
