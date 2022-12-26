const {StatusCodes} = require('http-status-codes');

const { ValidationError, AppError } = require('../services/index');
const {Booking} = require('../models/index');

class BookingRepository{
    async create(data){
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError',
                'Connot Create Booking',
                'Some error occurred while creating booking.',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = BookingRepository;

