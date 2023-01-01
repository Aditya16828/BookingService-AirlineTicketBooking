"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ScheduledFlight extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Booking, {
                foreignKey: 'schFlightId'
            });
        }
    }
    ScheduledFlight.init(
        {
            flightId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            flightDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                defaultValue: 0.0,
            },
            seatsAvailable: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            flightStatus: {
                type: DataTypes.ENUM,
                allowNull: false,
                values: ["ToBeConfirmed", "Confirmed", "Cancelled"],
                defaultValue: "ToBeConfirmed",
            },
        },
        {
            sequelize,
            modelName: "ScheduledFlight",
        }
    );
    return ScheduledFlight;
};
