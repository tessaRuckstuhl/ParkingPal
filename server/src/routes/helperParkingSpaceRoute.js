const router = require('express').Router();
const parkingSpaceController = require('../controllers/parkingSpaceController');

// api/parkingSpace/filter
router.get('/filter',parkingSpaceController.filterParkingSpaces);

// api/helperParkingSpace/filter/constraints
router.get('/filter/constraints', parkingSpaceController.getFilterConstraints)

// api/helperParkingSpace/:id
router.get('/listings/:id',parkingSpaceController.listOwnedParkingSpaces);

module.exports = router;
