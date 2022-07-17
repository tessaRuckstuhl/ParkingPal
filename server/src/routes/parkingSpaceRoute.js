const router = require('express').Router();
const parkingSpaceController = require('../controllers/parkingSpaceController');
const { isAuthenticated } = require('../middlewares');


// api/parkingSpace/
router.post('/', parkingSpaceController.createParkingSpace);

// api/parkingSpace/:id
router.get('/:id',parkingSpaceController.getParkingSpaceById);

// api/parkingSpace/:id
router.delete('/:id',parkingSpaceController.deleteParkingSpace);

// api/parkingSpace/:id
router.patch('/:id',parkingSpaceController.updateParkingSpace);

// api/parkingSpace/
router.get('/', isAuthenticated, parkingSpaceController.listParkingSpaces);

module.exports = router;
