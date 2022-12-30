const express =require('express');
const { Model } = require('sequelize');

const {BookingController} = require('../../controllers/index');

const router = express.Router();

router.post('/booking', BookingController.createBooking);

module.exports = router;