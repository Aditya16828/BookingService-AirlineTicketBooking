"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.ScheduledFlight, {
                foreignKey: 'schFlightId',
                onDelete: 'CASCADE'
            })
        }
    }
    Booking.init(
        {
            schFlightId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM,
                values: ["Processing", "Booked", "Cancelled"],
                defaultValue: "Processing",
            },
            noOfSeats: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            totalCost: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Booking",
        }
    );
    return Booking;
};
