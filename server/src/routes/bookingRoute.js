const router = require('express').Router();
const bookingController = require('../controllers/bookingController');

// api/booking/
router.post('/', bookingController.createBooking);

// api/booking/:id
router.get('/:id',bookingController.getBookingById);

// api/booking
router.get('/',bookingController.listBookings);

// api/booking/:id
router.delete('/:id',bookingController.deleteBooking);

// api/booking/ 
router.patch('/:id',bookingController.updateBookingById);

module.exports = router;
