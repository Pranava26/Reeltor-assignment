# User Management System with Notifications

This project implements a **User Management System** with functionalities like user authentication, profile management, and a notification system. The backend is built using **Node.js**, **Express**, and **MongoDB**.

## Features

### User Authentication
- Secure login and sign-up using email and password.

### Profile Management
- Update user details like name, bio, mobile number, and availability time slots.

### Notification System
- Users and admins can send notifications to single or multiple users.
- Notifications adhere to recipient availability or are marked critical to bypass availability constraints.

## Environment Variables

Ensure the following environment variables are set in a `.env` file:

```ini
PORT=<your_port>
MONGO_URI=<your_mongo_database_connection_string>
JWT_SECRET=<your_jwt_secret_key>
```

## Installation

### Local Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run start
   ```

### Deployed URL

Access the deployed application at: **https://reeltor-assignment-1.onrender.com**

## API Endpoints

### Authentication

#### POST `/api/auth/signup`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "12345",
      "email": "user@example.com"
    }
  }
  ```

#### POST `/api/auth/login`
- **Description**: Login with email and password.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "<JWT_TOKEN>"
  }
  ```

### Profile Management

#### PATCH `/api/auth/update-profile`
- **Description**: Update user profile.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "bio": "Hello, I'm Jane!",
    "availability": {
      "start": "09:00",
      "end": "17:00"
    },
    "mobileNumber": "9876543210"
  }
  ```
- **Response**:
  ```json
  {
    "updatedUser": {
      "name": "Jane Doe",
      "bio": "Hello, I'm Jane!",
      "availability": {
        "start": "09:00",
        "end": "17:00"
      },
      "mobileNumber": "9876543210"
    }
  }
  ```

### Notifications

#### POST `/api/notifications/send`
- **Description**: Send a notification to one or more users.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
  ```json
  {
    "recipientIds": ["userId1", "userId2"],
    "message": "This is a test notification",
    "type": "Critical"
  }
  ```
- **Response**:
  ```json
  {
    "notifications": [
      {
        "id": "notificationId1",
        "message": "This is a test notification",
        "type": "Critical",
        "status": "Delivered"
      }
    ]
  }
  ```

#### GET `/api/notifications`
- **Description**: Fetch all notifications for the logged-in user.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  {
    "notifications": [
      {
        "id": "notificationId1",
        "message": "This is a test notification",
        "status": "Delivered",
        "sentAt": "2023-12-01T12:00:00Z",
        "deliveredAt": "2023-12-01T12:01:00Z"
      }
    ]
  }
  ```

## Technologies Used

- **Node.js**: Backend runtime
- **Express.js**: Web framework
- **MongoDB**: Database for storing user and notification data
- **JWT**: Authentication mechanism
- **dotenv**: For environment variables

## How to Test

- Use **Postman** to test the API endpoints.
