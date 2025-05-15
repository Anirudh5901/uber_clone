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
