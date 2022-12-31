const express =require('express');
const { Model } = require('sequelize');

const {BookingController} = require('../../controllers/index');

const router = express.Router();

router.post('/booking', BookingController.createBooking);
/*
Request of form: 
    {
        flightId:
        userId:
        noOfSeats:
        bookingDate:
    }
*/
router.post('/updateBooking/:id', BookingController.updateBooking);
/*
Request of form: 
    {
        noOfSeats: (optional),
        bookingDate: (optional)
    }
*/

module.exports = router;