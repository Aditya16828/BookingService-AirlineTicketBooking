const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    FLIGHT_REQUEST_PORT: process.env.FLIGHT_REQUEST_PORT,
    USER_REQUEST_PORT: process.env.USER_REQUEST_PORT,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    BINDING_KEY: process.env.BINDING_KEY,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL
};