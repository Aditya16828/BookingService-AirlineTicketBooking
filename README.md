# BOOKING-SERVICE DOCUMENTATION

This micro-service mainly focusses on the booking of the flight tickets from the scheduled flights between various locations.

The features are:

- Booking a flight
- Cancelling a flight
- Updating a booked flight number of seats
- Fetch a booked flight

(For admins only)

- Scheduling a Flight
- Update details of a scheduled flight
- remove/delete a scheduled flight
- fetch a scheduled flight

## DB DESIGNS

- Tables Required:
  - Bookings
  - ScheduledFlights

- Design of Tables:
  - **Bookings Table _(or Booking Model)_**
    - id (created by sequelize automatically)
    - schFlightId
    - userId
    - status
    - noOfSeats
    - totalCost
    - createdAt (created by sequelize automatically)
    - updatedAt (created by sequelize automatically)
  - **ScheduledFlights _(or ScheduledFlight Model)_**
    - id (created by sequelize automatically)
    - flightId
    - flightDate
    - price
    - seatsAvailable
    - flightStatus
    - createdAt (created by sequelize automatically)
    - updatedAt (created by sequelize automatically)

![DB Design image](/docImages/DB_Designs.jpeg)

---
