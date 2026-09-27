# HelloWorld - Group 5

## Description

A Node.js and Express REST API with PostgreSQL database,
JWT authentication, bcrypt password hashing, CRUD operations,
input validation, error handling, and Swagger API documentation.

## Technologies

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- Swagger

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/jireh-03/HelloWorld.git
```

### 2. Open the project folder

```bash
cd HelloWorld
```

### 3. Install the project dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root.

Add the required database and JWT configuration:

```text
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

**Do not commit the `.env` file to GitHub.**

## How to Run

### 1. Start the server

Run:

```bash
node server.js
```

### 2. Check the server

If the server starts successfully, you should see:

```text
Students table ready
Server running on port 3000
Database connected successfully
```

The API will be available at:

```text
http://localhost:3000
```

## API Documentation

Swagger API documentation is available at:

```text
http://localhost:3000/api-docs
```

The Swagger documentation provides the available API endpoints,
request parameters, authentication requirements, and responses.

## Main API Features

- User registration and login
- JWT authentication
- Protected student endpoints
- Create, read, update, and delete students
- PostgreSQL database storage
- Input validation
- Error handling
- Swagger API documentation