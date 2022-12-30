"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class BookedFlight extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    BookedFlight.init(
        {
            flightId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            flightNo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            seatsAvailable: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            flightDate: { type: DataTypes.DATE, allowNull: false },
        },
        {
            sequelize,
            modelName: "BookedFlight",
        }
    );
    return BookedFlight;
};
