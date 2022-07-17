const router = require('express').Router();
const parkingSpaceController = require('../controllers/parkingSpaceController');
const { isAuthenticated} = require('../middlewares');

// api/parkingSpace/filter
router.get('/filter',parkingSpaceController.filterParkingSpaces);

// api/helperParkingSpace/filter/constraints
router.get('/filter/constraints', parkingSpaceController.getFilterConstraints)

// api/helperParkingSpace/:id
router.get('/listings/:id',isAuthenticated, parkingSpaceController.listOwnedParkingSpaces);

module.exports = router;
