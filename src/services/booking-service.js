const { BookingRepository } = require("../repository/index");
const {createChannel, publishMessage} = require('../utils/messageQueues');
const {BINDING_KEY, USER_REQUEST_PORT} = require('../config/serverConfig');
const ScheduledFlightService = require("./scheduledFlight-service");

const axios = require("axios");

class BookingService {
    constructor(channel) {
        this.channel = channel;
        this.bookingrepo = new BookingRepository();
        this.sfs = new ScheduledFlightService();
    }

    async #sendMsgToQueue(message) {
        try {
            await publishMessage(this.channel, BINDING_KEY, message);
            return {alert: "Mail sent Successfully"};
        } catch (error) {
            error = {...error, alert: "Unable to send mail"};
            console.log(error);
            throw error;
        }
    }

    async createBooking(data) {
        try {
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
           const userrqstURL = `http://localhost:${USER_REQUEST_PORT}/api/v1/userDetails/${data.userId}`;
           const userEmail = (await axios.get(userrqstURL)).data.data.email;
           console.log(userEmail);

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

                let booking = await this.bookingrepo.createBooking(data);

                // booking done, send an email confirmation
                const toQ = JSON.stringify({
                    data: {
                        from: "BookingService",
                        recipient: userEmail,
                        subject: "Booking Confirmation",
                        body: `Your flight with the following details has been booked:\n ${JSON.stringify(booking).replace(',', '\n')}`
                    },
                    command: 'sendMail'
                });
                const response = await this.#sendMsgToQueue(toQ);

                booking = {...booking, response};

                return booking;
            } else {
                throw { error: "Unavailable requested number of seats" };
            }
        } catch (error) {
            console.log("Not able to create Booking service level");
            console.log(error);
            throw error;
        }
    }

    async getBooking(id) {
        try {
            const booking = await this.bookingrepo.getBooking(id);
            return booking;
        } catch (error) {
            console.log("Not able to get Booking service level");
            console.log(error);
            throw error;
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

                const response1 = await this.bookingrepo.updateBooking(data, id);

                // send an updated booking email confirmation
                const response2 = await this.#sendMsgToQueue("Booking has confirmed");

                const response = {...response1, response2};
                return response;
            } else {
                return { error: "Unavailable requested number of seats" };
            }
        } catch (error) {
            console.log("Not able to update Booking service level");
            console.log(error);
            throw error;
        }
    }

    async removeBooking(id) {
        try {
            const response = await this.bookingrepo.removeBooking(id);
            
            // send a removal of booking confirmation

            return response;
        } catch (error) {
            console.log("Not able to remove Booking service level");
            console.log(error);
            throw error;
        }
    }
}

module.exports = BookingService;
