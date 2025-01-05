# To-Do List API with JWT Authentication

This is a RESTful API service for managing a to-do list. It includes user authentication via JSON Web Tokens (JWT), allowing only authenticated users to access the task management endpoints.

## **Features**
- **User Registration and Login**
  - Register new users with a username and password.
  - Authenticate users and provide JWT tokens.
- **Task Management**
  - Create, fetch, update, and delete tasks.
  - Protect task endpoints using JWT authentication.


## **Technologies Used**
- **Backend Framework:** Node.js with Express
- **Database:** MongoDB
- **Authentication:** JWT
- **Password Hashing:** bcryptjs


## **Getting Started**

### **Prerequisites**
1. Install [Node.js](https://nodejs.org/) and npm.
2. Install [MongoDB](https://www.mongodb.com/) and ensure it is running.

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/kratika-210/ToDo_App_Backend
   
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

### **Run the Server**
To start the server:
```bash
npm start
```

---

## **API Endpoints**

### **Authentication**

#### **Register a User**
**POST** `/auth/register`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
      "username": "testuser",
      "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
      "message": "User registered successfully."
  }
  ```

#### **Login User**
**POST** `/auth/login`
- **Description:** Authenticate user and get JWT token.
- **Request Body:**
  ```json
  {
      "username": "testuser",
      "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
      "token": "JWT_TOKEN_HERE"
  }
  ```

### **Tasks**

#### **Create a Task**
**POST** `/tasks`
- **Description:** Create a new task.
- **Headers:**
  ```json
  {
      "Authorization": "Bearer JWT_TOKEN_HERE"
  }
  ```
- **Request Body:**
  ```json
  {
      "title": "Sample Task",
      "description": "This is a sample task."
  }
  ```
- **Response:**
  ```json
  {
      "message": "Task created successfully.",
      "task": {
          
          "title": "Sample Task",
          "description": "This is a sample task.",
          "id": "<task_id>",
          "status": "pending"
      }
  }
  ```

#### **Fetch All Tasks**
**GET** `/tasks`
- **Description:** Retrieve all tasks.
- **Headers:**
  ```json
  {
      "Authorization": "Bearer JWT_TOKEN_HERE"
  }
  ```
- **Response:**
  ```json
  [
      {
          "id": "<task_id>",
          "title": "Sample Task",
          "description": "This is a sample task.",
          "status": "pending"
      }
  ]
  ```

#### **Fetch a Task by ID**
**GET** `/tasks/:id`
- **Description:** Retrieve a task by its ID.
- **Headers:**
  ```json
  {
      "Authorization": "Bearer JWT_TOKEN_HERE"
  }
  ```
- **Response:**
  ```json
  {
      "id": "<task_id>",
      "title": "Sample Task",
      "description": "This is a sample task.",
      "status": "pending"
  }
  ```

#### **Update Task Status**
**PUT** `/tasks/:id`
- **Description:** Update the status of a task (e.g., `pending`, `in-progress`, `completed`).
- **Headers:**
  ```json
  {
      "Authorization": "Bearer JWT_TOKEN_HERE"
  }
  ```
- **Request Body:**
  ```json
  {
      "status": "in-progress"
  }
  ```
- **Response:**
  ```json
  {
      "message": "Task updated successfully."
  }
  ```

#### **Delete a Task**
**DELETE** `/tasks/:id`
- **Description:** Delete a task by its ID.
- **Headers:**
  ```json
  {
      "Authorization": "Bearer JWT_TOKEN_HERE"
  }
  ```
- **Response:**
  ```json
  {
      "message": "Task deleted successfully."
  }
  ```

---

## **Testing**
1. Use [Postman](https://www.postman.com/) or similar tools to test the endpoints.
2. Include the JWT token in the `Authorization` header for all task-related requests:
   ```
   Authorization: Bearer JWT_TOKEN_HERE
   ```

---

## **Optional Enhancements**
- Add role-based access control (e.g., admin vs. user permissions).
- Implement token refresh logic for long-lived sessions.
- Add pagination for fetching tasks.
- Deploy the API to a cloud platform (e.g., AWS, Heroku).



