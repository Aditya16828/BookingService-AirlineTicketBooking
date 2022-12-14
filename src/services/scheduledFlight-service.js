const axios = require('axios');
const {FLIGHT_REQUEST_PORT} = require('../config/serverConfig')
const {ScheduledFlightRepository} = require('../repository/index');

class ScheduledFlightService {
    constructor(){
        this.schflightrepo = new ScheduledFlightRepository();
    }

    async createScheduledFlight(data){
        try {
            /*
            data:
                {
                    flightId, flightDate, flightStatus
                }
            */

            const flightRqstURL = `http://localhost:${FLIGHT_REQUEST_PORT}/api/v1/flights/${data.flightId}`;
            const flightDetails = (await axios.get(flightRqstURL)).data.data;

            data = {...data, price: flightDetails.price, seatsAvailable: flightDetails.availableSeats};
            // console.log(data);

            const schflight = await this.schflightrepo.createScheduledFlight(data);
            return schflight;
        } catch (error) {
            console.log("Error in scheduling a flight (service level)");
            console.log(error);
            throw {error};
        }
    }

    async getScheduledFlight(id){
        try {
            const schflight = await this.schflightrepo.getScheduledFlight(id);
            return schflight;
        } catch (error) {
            console.log("Error in scheduling a flight (service level)");
            throw {error};
        }
    }

    async removeScheduledFlight(id){
        try {
            const response = await this.schflightrepo.removeScheduledFlight(id);
            return response;       
        } catch (error) {
            console.log("Error in scheduling a flight (service level)");
            throw {error};
        }
    }

    async updateScheduledFlight(data, id){
        try {
            /*
            data:
            {
                flightId(optional), flightDate, seatsAvailable, flightStatus
            }
            */
            if(data.flightId){
                const flightRqstURL = `http://localhost:${FLIGHT_REQUEST_PORT}/api/v1/flights/${data.flightId}`;
                const flightDetails = (await axios.get(flightRqstURL)).data.data;
                const flightRqstURLprev = `http://localhost:${FLIGHT_REQUEST_PORT}/api/v1/flights/${(await this.getScheduledFlight(id)).flightId}`;
                const flightDetailsprev = (await axios.get(flightRqstURLprev)).data.data;
                data = {...data,
                    price: flightDetails.price,
                    seatsAvailable: flightDetails.availableSeats - (flightDetailsprev.availableSeats - (await this.getScheduledFlight(id)).seatsAvailable)
                };
            }
            const response = await this.schflightrepo.updateScheduledFlight(data, id);
            return response;
        } catch (error) {
            console.log("Error in scheduling a flight (service level)");
            console.log(error)
            throw error;
        }
    }
}

module.exports = ScheduledFlightService;