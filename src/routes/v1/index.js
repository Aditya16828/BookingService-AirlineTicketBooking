const express =require('express');

const {ScheduledFlightController, BookingController} = require('../../controllers/index');

const router = express.Router();
const bookingController = new BookingController();

router.post('/booking', bookingController.createBooking);
router.patch('/booking/:id', bookingController.updateBooking);
router.delete('/booking/:id', bookingController.removeBooking);
router.get('/booking/:id', bookingController.getBooking);
// router.post('/publish', bookingController.sendMsgToQueue);

router.post('/scheduleFlight', ScheduledFlightController.createScheduledFlight);
router.patch('/scheduleFlight/:id', ScheduledFlightController.updateScheduledFlight);
router.delete('/scheduleFlight/:id', ScheduledFlightController.removeScheduledFlight);
router.get('/scheduleFlight/:id', ScheduledFlightController.getScheduledFlight);

module.exports = router;