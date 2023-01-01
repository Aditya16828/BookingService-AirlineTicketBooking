const express =require('express');
const { Model } = require('sequelize');

const {ScheduledFlightController} = require('../../controllers/index');

const router = express.Router();

// router.post('/booking', BookingController.createBooking);
/*
Request of form: 
    {
        flightId:
        userId:
        noOfSeats:
        bookingDate:
    }
*/
// router.post('/updateBooking/:id', BookingController.updateBooking);
/*
Request of form: 
    {
        noOfSeats: (optional),
        bookingDate: (optional)
    }
*/

router.post('/scheduleFlight', ScheduledFlightController.createScheduledFlight);
router.patch('/scheduleFlight/:id', ScheduledFlightController.updateScheduledFlight);
router.delete('/scheduleFlight/:id', ScheduledFlightController.removeScheduledFlight);
router.get('/scheduleFlight/:id', ScheduledFlightController.getScheduledFlight);

module.exports = router;