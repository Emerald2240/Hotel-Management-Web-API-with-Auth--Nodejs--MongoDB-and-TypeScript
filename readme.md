# Hotel Mangement Web API
In an ongoing hotel management project, the backend developer having looked at the Figma Design is tasked to chunk out some APIs in vanilla javascript using NodeJs and ExpressJs for the frontend to consume.

The database consists of two tables or collections namely: Rooms and Room Types. The room type holds information about the size, luxury, description and inventory of the rooms. Each room has a name, price and a single room type.

You can download and build this project locally on your machine, but alternatively it is currently hosted at ***`https://mikes-hotel-service.onrender.com`***; simply replace localhost:5000 with the url stated above.

## Table of Contents
1. How to Install and Run
2. How to use the API and its Endpoints
3. Credits
4. How to Contribute

## How to Install and Run
This project is a NodeJs/Vanilla JavaScript app that runs with Express. Download the code locally into your machine and ensure you have NodeJs installed on your computer. 
- clone the repository
- install the dependencies: using `npm install`
- create a new file named `.env` in root folder of the project.
- Copy and paste the content of `.env.example` into `.env` and filling the value.
- You are advice to use atlas for the `DATABASE_URL` key but local database url is fine
- run `npm build` to build the Javascript files from Typescript; start the server in development with nodemon by running: `npm run dev` and read the terminal output to make sure that the server is running and the database is connected properly or use `npm run start` to run it directly without any extras (this mode is advised for live hosting).

## How to use the API and its Endpoints
### User Authentication
Before you can access the API, you need to create an account and login. Send a POST request to: **localhost:5000/api/v1/auth** and in the body, supply
1. first_name
2. last_name
3. email
4. password &
5. user_type(user or admin)

Example: 
```json
{
    "first_name":"Michael"
    "last_name":"Orji"
    "email":"orjimichael@learnable.com"
    "password":"12345"
    "user_type":"admin"
}
```

Once succesfully registered, go to: **localhost:5000/api/v1/auth/login**; supply it your email and password; you'll get a refresh token and access token, pass in the access token to the authorization header(`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV....`) before making any requests, depending on your user type you should have access to most of the API resources.
- **`localhost:5000/api/v1/auth/logout`** -- logout once you're done.
- **`localhost:5000/api/v1/auth/token`** -- Refresh login access token once it expires. Pass in the refresh token to the authorization header in this format: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV....`

### Types of Inputs
The API makes use of three main methods of sending inputs.

1. Parameters: localhost:5000/api/v1/room-type/63e772e968f23b2c2b3ea342
2. Queries: localhost:5000/api/v1/room-search?roomName=room 1&roomType:King&minPrice=10000&maxPrice=60000
3. Body: 
```json
{
    "name": "Room 1",
    "room_type": "63e772e968f23b2c2b3ea342",
    "price": 20000
}
```
These methods will be stated for each api endpoint.

### GET

1. **localhost:5000/** -- Base api endpoint. Simply returns a successful message, indicating the API is alive.
***
2. **localhost:5000/api/v1/rooms** -- Fetches all rooms available in the database. It takes no parameters.
***
3. **localhost:5000/api/v1/room/:id** -- Fetches a particular room, using its object Id. This takes a single parameter input (id) such that the query would look like: 

**localhost:5000/api/v1/room/63e77d29fcefc372dbb60b2c**
***
4. **localhost:5000/api/v1/room-search?roomName={searchRoomNameMatch}&roomType={searchRoomTypeNameMatch}&minPrice={searchRoomMinimumPriceMatch}&maxPrice={searchRoomMaximumPriceMatch}** -- Fetches a particular room or list of rooms that match one or more of the following: room name, room type, minimum price or maximum price. This endpoint takes a query as input. 

Eg: **localhost:5000/api/v1/room-search?roomName=Room 1&roomType=King&minPrice=10000&maxPrice=50000**
***
5. **localhost:5000/api/v1/room-types** -- Fetches all room types available in the database. It takes no parameters.
***
6. **localhost:5000/api/v1/room-type/:id** -- Fetches a particular room type, using its object Id. This takes a single parameter input (id) such that the query would look like: 

**localhost:5000/api/v1/room-type/63e77d29fcefc372dbb60b2c**
***
### POST
1. **localhost:5000/api/v1/room** -- Creates a new room in the database. Takes 3 main parameters from the request body in JSON format. These are: name, room_type and price. 

Example: 
```json
{
    "name": "Room 1",
    "room_type": "63e772e968f23b2c2b3ea342",
    "price": 20000
}
```
***
2. **localhost:5000/api/v1/room-type** -- Creates a new room type in the database. Takes 2 main parameters from the request body in JSON format. These are: name and description. 

Example: 
```json
{
    "name": "Twin",
    "description": "A room with two twin beds. May be occupied by one or more people. The room size or area of Twin Rooms are generally between 32 m² to 40 m²"
}
```
***

### PATCH
1. **localhost:5000/api/v1/room/:roomId** -- Updates a room previously created in the database. Takes 1 query parameter(roomId) and 3 main parameters from the request body in JSON format: name, room_type and price. The roomId query parameter helps to identify the particular room to be updated. Example: 

Query: **localhost:5000/api/v1/room/63e772e968f23b2c2b3ea342** 

Body: 
```json
{
    "name": "Room 1",
    "room_type": "63e772e968f23b2c2b3ea342",
    "price": 20000
}
```
***
2. **localhost:5000/api/v1/room/:roomId** -- Updates a room type previously created in the database. Takes 1 query parameter(roomTypeId) and 2 main parameters from the request body in JSON format: name and description. The roomTypeId query parameter helps to identify the particular room type to be updated. Example: 

Query: **localhost:5000/api/v1/room-type/63e772e968f23b2c2b3ea342** 

Body: 
```json
{
    "name": "Twin",
    "description": "This room is usually for children or siblings because they have multiple beds and small space."
}
```
***

### DELETE
1. **localhost:5000/api/v1/room/:roomId** -- Deletes a particular room. Takes one query parameter(roomId) for identifying the particular room to delete. Example:

Query: **localhhost:5000/api/v1/room/63e772e968f23b2c2b3ea342**
***
2. **localhost:5000/api/v1/room-type/:roomTypeId** -- Deletes a particular room type. Takes one query parameter(roomTypeId) for identifying the particular room type to delete. Example:

Query: **localhhost:5000/api/v1/room-type/63e772e968f23b2c2b3ea342**
 ***
 
 ## Credits
I had the assistance of many people whilst building the project; in the way of coding, design, testing, data entry and advice but most impactful of all were The Genesys Learnable Facilitators, Mentors and Tutors. I'm super grateful for the guidance and opportunity to develop and display my coding skills.

## How to contribute
If you find any part of the app you can improve, just fork the project, work on your own copy then send me a pull request, i reply as soon as possible. Do try to make the pull request as small as possible, that way its easier to read through them.
