const {ScheduledFlight} = require('../models/index');

class ScheduledFlightRepository {
    async createScheduledFlight(data){
        try {
            const schflight = await ScheduledFlight.create(data);
            return schflight;
        } catch (error) {
            console.log("Error in scheduling a flight (repository level)");
            console.log(error);
            throw {error};
        }
    }

    async removeScheduledFlight(id){
        try {
            await ScheduledFlight.destroy({
                where: {
                    id: id
                }
            });
            return true;
        } catch (error) {
            console.log("Error in scheduling a flight (repository level)");
            throw {error};
        }
    }

    async getScheduledFlight(id){
        try {
            const schflight = await ScheduledFlight.findByPk(id);
            return schflight;
        } catch (error) {
            console.log("Error in scheduling a flight (repository level)");
            throw {error};
        }
    }

    async updateScheduledFlight(data, id){
        try {
            await ScheduledFlight.update(data, {where:{id: id}});
            return true;
        } catch (error) {
            console.log("Error in scheduling a flight (repository level)");
            throw {error};
        }
    }
}

module.exports = ScheduledFlightRepository;