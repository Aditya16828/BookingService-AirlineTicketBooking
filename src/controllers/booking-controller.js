const {BookingService} = require('../services/index');

const {StatusCodes} = require('http-status-codes')

const bookingservice = new BookingService();

const createBooking = async (req, res) => {
    try {
        const booking = await bookingservice.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            data: booking,
            success: true,
            massage: "Successfully booked a flight",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explanation
        });
    }
}

module.exports = {createBooking};