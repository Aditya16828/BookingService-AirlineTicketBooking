const { BookingRepository } = require("../repository/index");
const axios = require("axios");
const { FLIGHT_REQUEST_PORT } = require("../config/serverConfig");
// const {ServiceError} = require('../utils/error-handlers/service-error')

class BookingService {
    constructor() {
        this.bookingrepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const bookingDate = data.bookingDate;
            const updatedflight = await this.bookingrepository.findFlight(
                flightId,
                bookingDate
            );

            let response;
            const flightrqstURL = `http://localhost:${FLIGHT_REQUEST_PORT}/api/v1/flights/${flightId}`;
            const flight = await axios.get(flightrqstURL);

            if (!updatedflight) {
                response = flight.data.data;
            } else {
                console.log("Hit");
                response = flight.data.data;
                response.availableSeats = updatedflight.seatsAvailable;
            }

            console.log(response);
            let seats = response.availableSeats;

            if (seats < data.noOfSeats) {
                throw new ServiceError(
                    "Unavailable Seats",
                    "Not enough Seats are available for booking"
                );
            }

            const totalPrice = response.price * data.noOfSeats;
            const isPayment = true;
            if (isPayment) {
                seats -= data.noOfSeats;

                const createBookingObj = {
                    flightId: data.flightId,
                    userId: data.userId,
                    noOfSeats: data.noOfSeats,
                    totalCost: totalPrice,
                    bookingDate: bookingDate,
                };
                const booking = await this.bookingrepository.createBooking(
                    createBookingObj
                );

                await this.bookingrepository.updateFlightDetails({
                    flightId: data.flightId,
                    flightNo: response.flightNo,
                    seatsAvailable: seats,
                    flightDate: bookingDate,
                });
                const bookingDetails = {
                    bookingId: booking.id,
                    bookingDate: bookingDate,
                    flightNo: response.flightNo,
                    amtPaid: totalPrice,
                };
                return bookingDetails;
            }
        } catch (error) {
            // throw new ServiceError();
            throw { error };
        }
    }

    async updateBooking(){

    }

    async cancelBooking(){
        
    }
}

module.exports = BookingService;
