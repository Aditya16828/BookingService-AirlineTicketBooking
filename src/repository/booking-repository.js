const {Booking} = require('../models/index');

class BookingRepository {
    async createBooking(data){
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            console.log("Error in deleting booking");
            console.log(error);
            throw {error};
        }
    }

    async getBooking(id){
        try {
            const booking = await Booking.findByPk(id);
            return booking;
        } catch (error) {
            console.log("Error in deleting booking");
            console.log(error);
            throw {error};
        }
    }

    async updateBooking(data, id){
        try {
            await Booking.update(data, {where: {id: id}});
            return true;
        } catch (error) {
            console.log("Error in deleting booking");
            console.log(error);
            throw {error};
        }
    }

    async removeBooking(id){
        try {
            await Booking.destroy({where:{id: id}});
            return true;
        } catch (error) {
            console.log("Error in deleting booking");
            console.log(error);
            throw {error};
        }
    }
}

module.exports = BookingRepository;