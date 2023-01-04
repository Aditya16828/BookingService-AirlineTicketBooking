const { BookingRepository } = require("../repository/index");
const ScheduledFlightService = require("./scheduledFlight-service");

class BookingService {
    constructor() {
        this.bookingrepo = new BookingRepository();
        this.sfs = new ScheduledFlightService();
    }

    async createBooking(data) {
        try {
            /*
            data: {
                schFlightId, userId, noOfSeats
            }
            */

            const schFlight = await this.sfs.getScheduledFlight(
                data.schFlightId
            );
            /*
            {
                "id": 5,
		        "flightId": 4,
		        "flightDate": "2023-02-21T13:20:00.000Z",
		        "price": "3500",
		        "seatsAvailable": 440,
		        "flightStatus": "Confirmed",
		        "createdAt": "2023-01-01T16:43:09.000Z",
		        "updatedAt": "2023-01-01T16:45:00.000Z"
            }
            */

            if (schFlight.seatsAvailable - data.noOfSeats >= 0) {
                await this.sfs.updateScheduledFlight(
                    {
                        seatsAvailable:
                            schFlight.seatsAvailable - data.noOfSeats,
                    },
                    data.schFlightId
                );
                data = {
                    ...data,
                    totalCost: data.noOfSeats * schFlight.price,
                    status: "Booked",
                };

                const booking = await this.bookingrepo.createBooking(data);
                return booking;
            } else {
                return { error: "Unavailable requested number of seats" };
            }
        } catch (error) {
            console.log("Not able to create Booking service level");
            console.log(error);
            throw { error };
        }
    }

    async getBooking(id) {
        try {
            const booking = await this.bookingrepo.getBooking(id);
            return booking;
        } catch (error) {
            console.log("Not able to get Booking service level");
            console.log(error);
            throw { error };
        }
    }

    async updateBooking(data, id) {
        try {
            /*
            data: {
                noOfSeats: 
            }
            */
            const booking = await this.getBooking(id);
            const schFlight = await this.sfs.getScheduledFlight(
                booking.schFlightId
            );
            if (schFlight.seatsAvailable + booking.noOfSeats - data.noOfSeats >= 0) {
                await this.sfs.updateScheduledFlight(
                    {
                        seatsAvailable:
                            schFlight.seatsAvailable +
                            booking.noOfSeats -
                            data.noOfSeats,
                    },
                    booking.schFlightId
                );

                data = {...data, totalCost: schFlight.price*data.noOfSeats};

                const response = await this.bookingrepo.updateBooking(data, id);
                return response;
            } else {
                return { error: "Unavailable requested number of seats" };
            }
        } catch (error) {
            console.log("Not able to update Booking service level");
            console.log(error);
            throw { error };
        }
    }

    async removeBooking(id) {
        try {
            const response = await this.bookingrepo.removeBooking(id);
            return response;
        } catch (error) {
            console.log("Not able to remove Booking service level");
            console.log(error);
            throw { error };
        }
    }
}

module.exports = BookingService;
