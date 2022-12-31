const { BookingRepository } = require("../repository/index");
const axios = require("axios");
const { FLIGHT_REQUEST_PORT } = require("../config/serverConfig");
// const {ServiceError} = require('../utils/error-handlers/service-error')

class BookingService {
    constructor() {
        this.bookingrepository = new BookingRepository();
    }

    #createUpdateObject(data){
        /*{
            change-noOfSeats, change-bookingDate
        }*/

        let obj = {};
        if(data.noOfSeats){
            obj.noOfSeats = data.noOfSeats;
            obj.totalCost = data.totalCost;
        }
        if(data.bookingDate){
            obj.bookingDate = data.bookingDate;
        }
        return obj;
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
            } else {
                // Keep in processing, make a cron job of 24 hrs=>if still in processing cancel booking.
            }
        } catch (error) {
            // throw new ServiceError();
            throw { error };
        }
    }

    async updateBooking(data, bookingId){
        try {
            const booking = await this.bookingrepository.getBooking(bookingId);
            console.log("booking", booking);
            const flightId = booking.flightId;

            const flightrqstURL = `http://localhost:${FLIGHT_REQUEST_PORT}/api/v1/flights/${flightId}`;
            const flight = await axios.get(flightrqstURL);

            const price = flight.data.data.price;
            console.log("price", price);

            const totalCost = data.noOfSeats*price;

            const updateData = this.#createUpdateObject({...data, totalCost});
            let updatedBookingResponse;
            let updatedBooking = {};

            let costDiff = (totalCost - booking.totalCost);
            if(costDiff <= 0){
                updatedBookingResponse = await this.bookingrepository.updateBooking(updateData, bookingId);
                updatedBooking = {"Returned": `Rs ${-1*costDiff}`};
            } else {
                const isPayment = true;
                if(isPayment){
                    updatedBookingResponse = await this.bookingrepository.updateBooking(updateData, bookingId);
                    updatedBooking = {"Paid": `Rs ${costDiff}`};
                }
            }

            if(updatedBookingResponse){
                updatedBooking["message"] = "Successfully updated";
            }

            return updatedBooking;
        } catch (error) {
            throw {error};
        }
    }

    async cancelBooking(){
        
    }
}

module.exports = BookingService;
