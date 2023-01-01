const {BookingRepository, ScheduledFlightRepository} = require('../repository/index');

class BookingService{
    constructor(){
        this.bookingrepo = new BookingRepository();
    }

    async createBooking(){}

    async getBooking(){}

    async updateBooking(){}

    async removeBooking(){}
}