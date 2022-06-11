const router = require('express').Router();
const parkingSpaceController = require('../controllers/parkingSpaceController');


// api/parkingSpace/
router.post('/', parkingSpaceController.createParkingSpace);

// api/parkingSpace/:id
router.get('/:id',parkingSpaceController.getParkingSpaceById);

// api/parkingSpace/:id
router.delete('/:id',parkingSpaceController.deleteParkingSpace);

// api/parkingSpace/
router.get('/',parkingSpaceController.listParkingSpaces);

module.exports = router;
