const router = require('express').Router();
const parkingSpaceController = require('../controllers/parkingSpaceController');


// api/parkingSpace
router.get('/', (req, res) => {
  res.send({
    message: 'ParkingSpaces'
  });
});
// api/parkingSpace/add
router.post('/add', parkingSpaceController.addParkingSpace);

// api/parkingSpace/$id
router.get('/$id',parkingSpaceController.getParkingSpace);

// api/parkingSpace/delete/$id
router.delete('/delete/$id',parkingSpaceController.removeParkingSpace);

// api/parkingSpace/all
router.get('/all',parkingSpaceController.getAllParkingSpaces);

module.exports = router;
