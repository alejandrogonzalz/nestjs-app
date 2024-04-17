
# Installation

```bash
$ npm install
```

# Setting up PostgreSQL Database

In the scripts folder, you will find a script to create a database in PostgreSQL. Once you create the database, you can update the username and password in ormconfig.ts. After that, run the following commands in NestJS:

# Create database

````bash
./create_database.sh

# Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
````

# Postman Collection

In the scripts folder, you will also find a NestJS Postman collection with the endpoints ready to be used. The available endpoints are as follows:

- createUser (POST)
- createTask (POST)
- getAllUsers (GET)
- getAllTasks (GET)
- updateTask (PATCH)
- deleteTask (DELETE)

# Enpoints

## Create a Task

Endpoint: POST /api/tasks/create

Description: Creates a new task with the provided details.

## Request Body:

{
"title": "Task Title",
"description": "Task Description",
"estimationHours": 5,
"deadline": "2024-04-30T12:00:00.000Z",
"status": "ACTIVE",
"usersId": [1, 2, 3],
"cost": 100
}

## Get All Tasks

Endpoint: GET /api/tasks/getAllTasks

Description: Retrieves all tasks with optional filtering and ordering options.

## Query Parameters:

-orderBy: Specifies the field by which to order the tasks. (Optional)
-expirationDate: Filters tasks based on their expiration date. (Optional)
-name: Filters tasks based on their name. (Optional)
-userId: Filters tasks assigned to a specific user by user ID. (Optional)

## Update a Task

Endpoint: PATCH /api/tasks/updateTask/:id

Description: Updates an existing task with the specified ID.

## Path Parameter:

id: The ID of the task to be updated.
Request Body:
{
"title": "Updated Task Title",
"description": "Updated Task Description",
"estimationHours": 8,
"deadline": "2024-05-10T12:00:00.000Z",
"status": "IN_PROGRESS",
"usersId": [1, 2],
"cost": 150
}

## Delete a Task

Endpoint: DELETE /api/tasks/deleteTask/:id

Description: Deletes the task with the specified ID.

# Path Parameter:

id: The ID of the task to be deleted.

# Create a User
Endpoint: POST /api/users/create

# Description: Creates a new user with the provided details.

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "MEMBER"
}

# Get All Users
Endpoint: GET /api/users/getAllUsers

Description: Retrieves all users with optional filtering options.

# Query Parameters:

- name: Filters users based on their name. (Optional)
- email: Filters users based on their email. (Optional)
- role: Filters users based on their role. (Optional)

