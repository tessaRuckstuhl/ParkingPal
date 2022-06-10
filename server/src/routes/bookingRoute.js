const router = require('express').Router();
const bookingController = require('../controllers/bookingController');

const { isAuthenticated, signup } = require('../middlewares');

// api/booking/
router.post('/', bookingController.createBooking);

// api/booking/:id
router.get('/:id',bookingController.getBookingById);

// // api/booking/:id
// router.delete('/:id',bookingController.deletebooking);

// // api/booking/
// router.get('/',bookingController.listbookings);


module.exports = router;
