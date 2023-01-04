const {BookingService} = require('../services/index')

const bs = new BookingService();

const createBooking = async (req, res) => {
    try {
        const response = await bs.createBooking(req.body);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully Booked flight",
            err: {}
        });
    } catch (error) {
        console.log("Unable create Booking controller level");
        console.log(error);
        throw {error};
    }
}

const getBooking = async (req, res) => {
    try {
        const response = await bs.getBooking(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched Booking",
            err: {}
        });
    } catch (error) {
        console.log("Unable fetch Booking controller level");
        console.log(error);
        throw {error};
    }
}

const updateBooking = async (req, res) => {
    try {
        const response = await bs.updateBooking(req.body, req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully updated Booking",
            err: {}
        });
    } catch (error) {
        console.log("Unable fetch Booking controller level");
        console.log(error);
        throw {error};
    }
}

const removeBooking = async (req, res) => {
    try {
        const response = await bs.removeBooking(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully removed Booking",
            err: {}
        });
    } catch (error) {
        console.log("Unable fetch Booking controller level");
        console.log(error);
        throw {error};
    }
}

module.exports = {
    createBooking,
    getBooking,
    updateBooking,
    removeBooking
}