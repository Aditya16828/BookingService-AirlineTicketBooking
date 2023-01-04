const express =require('express');

const {ScheduledFlightController, BookingController} = require('../../controllers/index');

const router = express.Router();

router.post('/booking', BookingController.createBooking);
/*
Request of form: 
            {
                schFlightId, userId, noOfSeats
            }
*/
router.patch('/booking/:id', BookingController.updateBooking);
/*
Request of form: 
    {
        noOfSeats
    }
*/
router.delete('/booking/:id', BookingController.removeBooking);
router.get('/booking/:id', BookingController.getBooking);

router.post('/scheduleFlight', ScheduledFlightController.createScheduledFlight);
router.patch('/scheduleFlight/:id', ScheduledFlightController.updateScheduledFlight);
router.delete('/scheduleFlight/:id', ScheduledFlightController.removeScheduledFlight);
router.get('/scheduleFlight/:id', ScheduledFlightController.getScheduledFlight);

module.exports = router;