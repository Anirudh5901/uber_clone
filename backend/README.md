# API Documentation: `/users/register`

## Endpoint

**POST** `/users/register`

## Description

This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns a JSON Web Token (JWT) along with the user details.

## Request

### Headers

- `Content-Type: application/json`

### Body

The request body should be a JSON object with the following fields:

| Field                | Type   | Required | Description                                   |
| -------------------- | ------ | -------- | --------------------------------------------- |
| `fullname.firstname` | String | Yes      | First name of the user (minimum 3 characters) |
| `fullname.lastname`  | String | No       | Last name of the user (minimum 3 characters)  |
| `email`              | String | Yes      | Email address of the user (must be valid)     |
| `password`           | String | Yes      | Password for the user (minimum 6 characters)  |

## Response

### Success (201 Created)

If the user is successfully registered, the server responds with:

#### Example Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error (400 Bad Request)

If the input validation fails, the server responds with:

#### Example Response

```json
{
  "errors": [
    {
      "msg": "First name must be atleast 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

## Example Usage

### Successful Registration

#### Request

```bash
curl -X POST http://localhost:4000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

#### Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Validation Error

#### Request

```bash
curl -X POST http://localhost:4000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "Jo"
  },
  "email": "invalid-email",
  "password": "123"
}'
```

#### Response

```json
{
  "errors": [
    {
      "msg": "First name must be atleast 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be atleast 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

# API Documentation: `/users/login`

## Endpoint

**POST** `/users/login`

## Description

This endpoint authenticates an existing user. It validates the input data, verifies the password, and returns a JSON Web Token (JWT) along with the user details.

## Request

### Headers

- `Content-Type: application/json`

### Body

The request body should be a JSON object with the following fields:

| Field      | Type   | Required | Description                                  |
| ---------- | ------ | -------- | -------------------------------------------- |
| `email`    | String | Yes      | Email address of the user (must be valid)    |
| `password` | String | Yes      | Password for the user (minimum 6 characters) |

## Response

### Success (200 OK)

If the login is successful, the server responds with:

#### Example Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error (401 Unauthorized)

If the authentication fails, the server responds with:

#### Example Response

```json
{
  "message": "Invalid email or password"
}
```

## Example Usage

### Successful Login

#### Request

```bash
curl -X POST http://localhost:4000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

#### Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Validation Error

#### Request

```bash
curl -X POST http://localhost:4000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "invalid-email",
  "password": "123"
}'
```

#### Response

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be atleast 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

# API Documentation: `/users/profile`

## Endpoint

**GET** `/users/profile`

## Description

This endpoint retrieves the profile information of the currently authenticated user.

## Request

### Headers

- `Authorization: Bearer <token>` or Cookie with `token`

## Response

### Success (200 OK)

If the user is authenticated, the server responds with:

#### Example Response

```json
{
  "_id": "user_id_here",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

### Error (401 Unauthorized)

If the user is not authenticated, the server responds with:

#### Example Response

```json
{
  "message": "Unauthorized"
}
```

## Example Usage

#### Request

```bash
curl -X GET http://localhost:4000/users/profile \
-H "Authorization: Bearer jwt_token_here"
```

# API Documentation: `/users/logout`

## Endpoint

**GET** `/users/logout`

## Description

This endpoint logs out the currently authenticated user by invalidating their token and clearing cookies.

## Request

### Headers

- `Authorization: Bearer <token>` or Cookie with `token`

## Response

### Success (200 OK)

If the logout is successful, the server responds with:

#### Example Response

```json
{
  "message": "Logged Out"
}
```

### Error (401 Unauthorized)

If the user is not authenticated, the server responds with:

#### Example Response

```json
{
  "message": "Unauthorized"
}
```

## Example Usage

#### Request

```bash
curl -X GET http://localhost:4000/users/logout \
-H "Authorization: Bearer jwt_token_here"
```

# API Documentation: `/captains/register`

## Endpoint

**POST** `/captains/register`

## Description

This endpoint registers a new captain. It validates the input data, hashes the password, creates a new captain in the database, and returns a JSON Web Token (JWT) along with the captain details.

## Request

### Headers

- `Content-Type: application/json`

### Body

The request body should be a JSON object with the following fields:

| Field                 | Type   | Required | Description                                      |
| --------------------- | ------ | -------- | ------------------------------------------------ |
| `fullname.firstname`  | String | Yes      | First name of the captain (minimum 3 characters) |
| `fullname.lastname`   | String | No       | Last name of the captain (minimum 3 characters)  |
| `email`               | String | Yes      | Email address of the captain (must be valid)     |
| `password`            | String | Yes      | Password for the captain (minimum 6 characters)  |
| `vehicle.color`       | String | Yes      | Color of the vehicle (minimum 3 characters)      |
| `vehicle.plate`       | String | Yes      | Vehicle plate number (minimum 3 characters)      |
| `vehicle.capacity`    | Number | Yes      | Vehicle capacity (minimum 1)                     |
| `vehicle.vehicleType` | String | Yes      | Type of vehicle ("car", "motorcycle", "auto")    |

## Response

### Success (201 Created)

#### Example Response

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

### Error (400 Bad Request)

#### Example Response

```json
{
  "errors": [
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

## Example Usage

#### Request

```bash
curl -X POST http://localhost:4000/captains/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
```

# API Documentation: `/captains/login`

## Endpoint

**POST** `/captains/login`

## Description

This endpoint authenticates an existing captain. It validates the input data, verifies the password, and returns a JSON Web Token (JWT) along with the captain details.

## Request

### Headers

- `Content-Type: application/json`

### Body

| Field      | Type   | Required | Description                                     |
| ---------- | ------ | -------- | ----------------------------------------------- |
| `email`    | String | Yes      | Email address of the captain (must be valid)    |
| `password` | String | Yes      | Password for the captain (minimum 6 characters) |

## Response

### Success (200 OK)

#### Example Response

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

# API Documentation: `/captains/profile`

## Endpoint

**GET** `/captains/profile`

## Description

This endpoint retrieves the profile information of the currently authenticated captain.

## Request

### Headers

- `Authorization: Bearer <token>` or Cookie with `token`

## Response

### Success (200 OK)

#### Example Response

```json
{
  "_id": "captain_id_here",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "vehicle": {
    "color": "black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  },
  "status": "inactive"
}
```

# API Documentation: `/captains/logout`

## Endpoint

**GET** `/captains/logout`

## Description

This endpoint logs out the currently authenticated captain by invalidating their token and clearing cookies.

## Request

### Headers

- `Authorization: Bearer <token>` or Cookie with `token`

## Response

### Success (200 OK)

#### Example Response

```json
{
  "message": "Logged Out"
}
```

### Error (401 Unauthorized)

#### Example Response

```json
{
  "message": "Unauthorized"
}
```

# API Documentation: `/maps/get-coordinates`

## Endpoint

**GET** `/maps/get-coordinates`

## Description

This endpoint converts an address into geographical coordinates using the Google Maps Geocoding API.

## Request

### Headers

- `Authorization: Bearer <token>` or Cookie with `token`

### Query Parameters

| Parameter | Type   | Required | Description                           |
| --------- | ------ | -------- | ------------------------------------- |
| `address` | String | Yes      | The address to convert to coordinates |

## Response

### Success (200 OK)

#### Example Response

```json
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
```

### Error (400 Bad Request)

#### Example Response

```json
{
  "errors": [
    {
      "msg": "Address must be at least 3 characters long",
      "param": "address",
      "location": "query"
    }
  ]
}
```

## Example Usage

```bash
curl -X GET "http://localhost:4000/maps/get-coordinates?address=1600+Amphitheatre+Parkway" \
-H "Authorization: Bearer jwt_token_here"
```

# API Documentation: `/maps/get-distance-time`

## Endpoint

**GET** `/maps/get-distance-time`

## Description

This endpoint calculates the distance and estimated travel time between two locations using the Google Maps Distance Matrix API.

## Request

### Headers

- `Authorization: Bearer <token>` or Cookie with `token`

### Query Parameters

| Parameter     | Type   | Required | Description                   |
| ------------- | ------ | -------- | ----------------------------- |
| `origin`      | String | Yes      | Starting point of the journey |
| `destination` | String | Yes      | End point of the journey      |

## Response

### Success (200 OK)

#### Example Response

```json
{
  "distance": {
    "text": "12.4 km",
    "value": 12400
  },
  "duration": {
    "text": "25 mins",
    "value": 1500
  }
}
```

### Error (400 Bad Request)

#### Example Response

```json
{
  "errors": [
    {
      "msg": "Origin must be at least 3 characters long",
      "param": "origin",
      "location": "query"
    }
  ]
}
```

## Example Usage

```bash
curl -X GET "http://localhost:4000/maps/get-distance-time?origin=Silicon+Valley&destination=San+Francisco" \
-H "Authorization: Bearer jwt_token_here"
```

# API Documentation: `/maps/get-suggestions`

## Endpoint

**GET** `/maps/get-suggestions`

## Description

This endpoint provides address suggestions based on user input using the Google Maps Place Autocomplete API.

## Request

### Headers

- `Authorization: Bearer <token>` or Cookie with `token`

### Query Parameters

| Parameter | Type   | Required | Description                           |
| --------- | ------ | -------- | ------------------------------------- |
| `input`   | String | Yes      | The text input to get suggestions for |

## Response

### Success (200 OK)

#### Example Response

```json
[
  {
    "description": "Silicon Valley, California, USA",
    "place_id": "ChIJ9T_5iuTKj4ARe3GfygqMnbk",
    "structured_formatting": {
      "main_text": "Silicon Valley",
      "secondary_text": "California, USA"
    }
  }
]
```

### Error (400 Bad Request)

#### Example Response

```json
{
  "errors": [
    {
      "msg": "Input must be at least 3 characters long",
      "param": "input",
      "location": "query"
    }
  ]
}
```

## Example Usage

```bash
curl -X GET "http://localhost:4000/maps/get-suggestions?input=Silicon" \
-H "Authorization: Bearer jwt_token_here"
```

# API Documentation: `/maps/get-coordinates`

## Endpoint

**GET** `/maps/get-coordinates`

## Description

This endpoint converts an address into geographical coordinates using the Google Maps Geocoding API.

## Request

### Headers

- `Authorization: Bearer <token>` or Cookie with `token`

### Query Parameters

| Parameter | Type   | Required | Description                           |
| --------- | ------ | -------- | ------------------------------------- |
| `address` | String | Yes      | The address to convert to coordinates |

## Response

### Success (200 OK)

#### Example Response

```json
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
```

### Error (400 Bad Request)

#### Example Response

```json
{
  "errors": [
    {
      "msg": "Address must be at least 3 characters long",
      "param": "address",
      "location": "query"
    }
  ]
}
```

## Example Usage

```bash
curl -X GET "http://localhost:4000/maps/get-coordinates?address=1600+Amphitheatre+Parkway" \
-H "Authorization: Bearer jwt_token_here"
```

# API Documentation: `/maps/get-distance-time`

## Endpoint

**GET** `/maps/get-distance-time`

## Description

This endpoint calculates the distance and estimated travel time between two locations using the Google Maps Distance Matrix API.

## Request

### Headers

- `Authorization: Bearer <token>` or Cookie with `token`

### Query Parameters

| Parameter     | Type   | Required | Description                   |
| ------------- | ------ | -------- | ----------------------------- |
| `origin`      | String | Yes      | Starting point of the journey |
| `destination` | String | Yes      | End point of the journey      |

## Response

### Success (200 OK)

#### Example Response

```json
{
  "distance": {
    "text": "12.4 km",
    "value": 12400
  },
  "duration": {
    "text": "25 mins",
    "value": 1500
  }
}
```

### Error (400 Bad Request)

#### Example Response

```json
{
  "errors": [
    {
      "msg": "Origin must be at least 3 characters long",
      "param": "origin",
      "location": "query"
    }
  ]
}
```

## Example Usage

```bash
curl -X GET "http://localhost:4000/maps/get-distance-time?origin=Silicon+Valley&destination=San+Francisco" \
-H "Authorization: Bearer jwt_token_here"
```

# API Documentation: `/maps/get-suggestions`

## Endpoint

**GET** `/maps/get-suggestions`

## Description

This endpoint provides address suggestions based on user input using the Google Maps Place Autocomplete API.

## Request

### Headers

- `Authorization: Bearer <token>` or Cookie with `token`

### Query Parameters

| Parameter | Type   | Required | Description                           |
| --------- | ------ | -------- | ------------------------------------- |
| `input`   | String | Yes      | The text input to get suggestions for |

## Response

### Success (200 OK)

#### Example Response

```json
[
  {
    "description": "Silicon Valley, California, USA",
    "place_id": "ChIJ9T_5iuTKj4ARe3GfygqMnbk",
    "structured_formatting": {
      "main_text": "Silicon Valley",
      "secondary_text": "California, USA"
    }
  }
]
```

### Error (400 Bad Request)

#### Example Response

```json
{
  "errors": [
    {
      "msg": "Input must be at least 3 characters long",
      "param": "input",
      "location": "query"
    }
  ]
}
```

## Example Usage

```bash
curl -X GET "http://localhost:4000/maps/get-suggestions?input=Silicon" \
-H "Authorization: Bearer jwt_token_here"
```

# API Documentation: `/maps/captain-get-distance-time`

## Endpoint

**GET** `/maps/captain-get-distance-time`

## Description

This endpoint calculates the distance and estimated travel time between two locations, specifically for captains.

## Request

### Headers

- `Authorization: Bearer <token>` or Cookie with `token`

### Query Parameters

| Parameter     | Type   | Required | Description                   |
| ------------- | ------ | -------- | ----------------------------- |
| `origin`      | String | Yes      | Starting point of the journey |
| `destination` | String | Yes      | End point of the journey      |

## Response

### Success (200 OK)

#### Example Response

```json
{
  "distance": {
    "text": "12.4 km",
    "value": 12400
  },
  "duration": {
    "text": "25 mins",
    "value": 1500
  }
}
```

### Error (400 Bad Request)

#### Example Response

```json
{
  "errors": [
    {
      "msg": "Origin must be at least 3 characters long",
      "param": "origin",
      "location": "query"
    }
  ]
}
```

# API Documentation: `/rides/create`

## Endpoint

**POST** `/rides/create`

## Description

This endpoint creates a new ride request. It validates the input data, calculates fare based on distance and vehicle type, creates a ride record in the database, and notifies nearby captains.

## Request

### Headers

- `Content-Type: application/json`
- `Authorization: Bearer <token>` or Cookie with `token`

### Body

| Field         | Type   | Required | Description                                    |
| ------------- | ------ | -------- | ---------------------------------------------- |
| `pickup`      | String | Yes      | Pickup location address (minimum 3 characters) |
| `destination` | String | Yes      | Destination address (minimum 3 characters)     |
| `vehicleType` | String | Yes      | Type of vehicle ("car", "motorcycle", "auto")  |

## Response

### Success (201 Created)

#### Example Response

```json
{
  "_id": "ride_id_here",
  "user": "user_id_here",
  "pickup": "Silicon Valley",
  "destination": "San Francisco",
  "fare": 450.75,
  "status": "pending",
  "duration": 1500,
  "distance": 12400
}
```

### Error (400 Bad Request)

#### Example Response

```json
{
  "errors": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "body"
    }
  ]
}
```

# API Documentation: `/rides/get-fare`

## Endpoint

**GET** `/rides/get-fare`

## Description

This endpoint calculates the estimated fare for a ride based on pickup and destination locations.

## Request

### Headers

- `Authorization: Bearer <token>` or Cookie with `token`

### Query Parameters

| Parameter     | Type   | Required | Description                   |
| ------------- | ------ | -------- | ----------------------------- |
| `pickup`      | String | Yes      | Starting point of the journey |
| `destination` | String | Yes      | End point of the journey      |

## Response

### Success (200 OK)

#### Example Response

```json
{
  "car": 450.75,
  "motorcycle": 250.5,
  "auto": 350.25
}
```

# API Documentation: `/rides/confirm`

## Endpoint

**POST** `/rides/confirm`

## Description

This endpoint allows a captain to confirm and accept a ride request.

## Request

### Headers

- `Content-Type: application/json`
- `Authorization: Bearer <token>` or Cookie with `token`

### Body

| Field    | Type   | Required | Description        |
| -------- | ------ | -------- | ------------------ |
| `rideId` | String | Yes      | MongoDB ID of ride |

## Response

### Success (200 OK)

#### Example Response

```json
{
  "_id": "ride_id_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  },
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    }
  },
  "status": "accepted",
  "otp": "123456"
}
```

# API Documentation: `/rides/start-ride`

## Endpoint

**GET** `/rides/start-ride`

## Description

This endpoint allows a captain to start a confirmed ride using the OTP provided by the user.

## Request

### Headers

- `Authorization: Bearer <token>` or Cookie with `token`

### Query Parameters

| Field    | Type   | Required | Description                  |
| -------- | ------ | -------- | ---------------------------- |
| `rideId` | String | Yes      | MongoDB ID of ride           |
| `otp`    | String | Yes      | 6-digit OTP provided by user |

## Response

### Success (200 OK)

#### Example Response

```json
{
  "_id": "ride_id_here",
  "status": "ongoing",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John"
    }
  },
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Jane"
    }
  }
}
```

# API Documentation: `/rides/end-ride`

## Endpoint

**POST** `/rides/end-ride`

## Description

This endpoint allows a captain to end an ongoing ride.

## Request

### Headers

- `Content-Type: application/json`
- `Authorization: Bearer <token>` or Cookie with `token`

### Body

| Field    | Type   | Required | Description        |
| -------- | ------ | -------- | ------------------ |
| `rideId` | String | Yes      | MongoDB ID of ride |

## Response

### Success (200 OK)

#### Example Response

```json
{
  "_id": "ride_id_here",
  "status": "completed",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John"
    }
  },
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Jane"
    }
  },
  "fare": 450.75
}
```
