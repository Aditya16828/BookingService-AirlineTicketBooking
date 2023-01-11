const {BookingService} = require('../services/index')
// const {createChannel, publishMessage} = require('../utils/messageQueues');
// const {BINDING_KEY} = require('../config/serverConfig');

class BookingController{
    constructor(){
        this.bs = new BookingService();
    }

    createBooking = async (req, res) => {
        try {
            const response = await this.bs.createBooking(req.body);
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
    
    getBooking = async (req, res) => {
        try {
            const response = await this.bs.getBooking(req.params.id);
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
    
    updateBooking = async (req, res) => {
        try {
            const response = await this.bs.updateBooking(req.body, req.params.id);
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
    
    removeBooking = async (req, res) => {
        try {
            const response = await this.bs.removeBooking(req.params.id);
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
}

module.exports = BookingController;