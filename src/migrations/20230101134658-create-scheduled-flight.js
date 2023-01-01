'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ScheduledFlights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      flightDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0.0
      },
      seatsAvailable: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      flightStatus: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["ToBeConfirmed", "Confirmed", "Cancelled"],
        defaultValue: "ToBeConfirmed"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ScheduledFlights');
  }
};