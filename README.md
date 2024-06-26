# Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Postman Collection

In the scripts folder, you will also find a NestJS Postman collection with the endpoints ready to be used. The available endpoints are as follows:

- createUser (POST)
- createTask (POST)
- getAllUsers (GET)
- getAllTasks (GET)
- updateTask (PATCH)
- deleteTask (DELETE)

# Enpoints

# Create a Task

Endpoint: POST /api/tasks/create

Description: Creates a new task with the provided details.

# Request Body:

{
"title": "Task Title",
"description": "Task Description",
"estimationHours": 5,
"deadline": "2024-04-30T12:00:00.000Z",
"status": "ACTIVE",
"usersId": [1, 2, 3],
"cost": 100
}

# Get All Tasks

Endpoint: GET /api/tasks/getAllTasks

Description: Retrieves all tasks with optional filtering and ordering options.

# Query Parameters:

-orderBy: Specifies the field by which to order the tasks. (Optional)
-expirationDate: Filters tasks based on their expiration date. (Optional)
-name: Filters tasks based on their name. (Optional)
-userId: Filters tasks assigned to a specific user by user ID. (Optional)

# Update a Task

Endpoint: PATCH /api/tasks/updateTask/:id

Description: Updates an existing task with the specified ID.

# Path Parameter:

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

# Delete a Task

Endpoint: DELETE /api/tasks/deleteTask/:id

Description: Deletes the task with the specified ID.

# Path Parameter:

id: The ID of the task to be deleted.

# Get Task Completion Users Ratio

Endpoint: GET /api/task-completion/getTaskCompletionUserRatio

Description: Retrieves the completion ratio and task statistics for each user.

## Response

Type: JSON array of objects

### Fields

- name (string, required): The name of the user.
- email (string, required): The email address of the user.
- completionRatio (number, required): The ratio of completed tasks to total tasks for the user.
- completedTasks (number, required): The number of completed tasks for the user.
- totalTasks (number, required): The total number of tasks assigned to the user.

Example Response:

[
{
"name": "John Doe",
"email": "john@example.com",
"completionRatio": 0.75,
"completedTasks": 15,
"totalTasks": 20
},
{
"name": "Jane Smith",
"email": "jane@example.com",
"completionRatio": 0.5,
"completedTasks": 10,
"totalTasks": 20
}
]

# Get Task Status Time Statistics

Endpoint: GET /api/tasks/getTaskStatusTimeStatistics

Description: Retrieves the average time spent on tasks based on their status.

## Response

Type: JSON array of objects

### Fields

- status (string, required): The status of the tasks.
- averageTimeSpent (number, required): The average time spent on tasks in hours.

Example Response:

[
{
"status": "ACTIVE",
"averageTimeSpent": 6.5
},
{
"status": "FINISHED",
"averageTimeSpent": 8.0
}
// Other statuses...
]
