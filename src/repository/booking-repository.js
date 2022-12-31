const { StatusCodes } = require("http-status-codes");

// const { ValidationError, AppError } = require("../services/index");
const { Booking, BookedFlight } = require("../models/index");

class BookingRepository {
    async findFlight(flightId, bookingDate) {
        try {
            const response = await BookedFlight.findOne({
                where: { flightId: flightId, flightDate: bookingDate },
            });
            return response;
        } catch (error) {}
    }

    async getBooking(bookingId){
        try {
            const booking = await Booking.findByPk(bookingId);
            return booking;
        } catch (error) {
            throw {error};
        }
    }

    async createBooking(data) {
        try {
            const booking = await Booking.create({
                flightId: data.flightId,
                userId: data.userId,
                status: "Booked",
                noOfSeats: data.noOfSeats,
                totalCost: data.totalCost,
                bookingDate: data.bookingDate,
            });
            return booking;
        } catch (error) {
            // if (error.name == "SequelizeValidationError") {
            //     throw new ValidationError(error);
            // }
            throw {error};
        }
    }

    async updateBooking(data, bookingId) {
        try {
            await Booking.update(data, {
                where:{
                    id: bookingId
                }
            })

            return true;
        } catch (error) {
            
        }
    }

    async createFlightDetails(data) {
        try {
            const flight = await BookedFlight.create(data);
            return true;
        } catch (error) {
            
        }
    }

    async updateFlightDetails(data) {
        try {
            const flight = await this.findFlight(
                data.flightId,
                data.flightDate
            );
            if (!flight) {
                await this.createFlightDetails(data);
            } else {
                flight.seatsAvailable = data.seatsAvailable;
                flight.save();
            }
            return true;
        } catch (error) {}
    }
}

module.exports = BookingRepository;
