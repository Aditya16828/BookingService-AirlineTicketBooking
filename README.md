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

## APIs exposed and its corresponding URLS

As mentioned above, there are 2 types of APIs exposed for the user, which is distributed **as per role of the user**.

### For Customers

- For Booking Flight

- For updating a Booked Flight

- For cancelling a Booking

- To get details for a Booking

### For Admins

- **For scheduling a FLight:**
 Url = <http://localhost:3003/api/v1/scheduleFlight>  
 Request format (post, sent in body) (json):

 ```json
 {
 "flightId":<INTEGER_FLIGHTID>,
 "flightDate": <FLIGHTDATE_AND_TIME>,
 "flightStatus": "<Confirmed, ToBeConfirmed, Cancelled>" (optional)
 }
 ```

- **To update an already scheduled Flight:**
 Url = <http://localhost:3003/api/v1/scheduleFlight/:id>  
 Request format (patch, sent in body and request params) (json):

 ```json
 {
 "flightId":<INTEGER_FLIGHTID>,
 "flightDate": <FLIGHTDATE_AND_TIME>,
 "flightStatus": "<Confirmed, ToBeConfirmed, Cancelled>",
 "seatsAvailable": <NON-NEGATIVE_INTEGER>
}
 ```

- **To delete a schduled Flight:**
 Url = <http://localhost:3003/api/v1/scheduleFlight/:id>  
 Request format (delete, sent in request params)

- **To fetch details about a scheduled Flight:**
 Url = <http://localhost:3003/api/v1/scheduleFlight/:id>  
 Request format (get, sent in request params)
