# BOOKING SERVICE FOR AIRLINE BOOKING SYSTEM

## Basic Server Setup Steps

- Create the folder `./src/` inside which create the following folder:
  - `config`
  - `controllers`

---

## DB Setup

- **DB Structure**

  - flighId -> {integer, NOT NULL}
  - userId -> {integer, NOT NULL}
  - status -> {ENUM, NOT NULL, values: ['Processing', 'Booked', 'Cancelled'], defaultValue: 'Processing'}

  - Run the command `npx sequelize model:generate --name Booking --attributes flightId:integer,userId:integer,status:ENUM` to create the ==Database Booking==.
  - Make the required changes to the models and migrations folder.
  - Run the command `npx sequelize db:migrate` to apply the migrations.

## Repository Layer

- In the file `booking-repository.js`

  - `create(data)` -> Create a booking

### Create a new migration

- `npx sequelize migration:create --name modify_bookings_add_new_fields`
