# Ticket Dashboard Backend

This is the backend for a ticket dashboard application. It is built with Node.js, Express, and TypeScript.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Create a `.env` file:**
    Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    MONGO_URI=<your-mongodb-uri>
    EMAIL_SERVICE=<your-email-service>
    EMAIL_USER=<your-email-user>
    EMAIL_PASS=<your-email-password>
    JWT_SECRET=<your-jwt-secret>
    JWT_EXPIRES_IN=<your-jwt-expires-in>
    SUPERUSER_PASSWORD=<your-superuser-password>
    ```
5.  **Start the development server:**
    ```bash
    npm run dev
    ```

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── onlineUsers.ts
│   │   ├── queue.ts
│   │   └── superuser.ts
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   ├── ProjectController.ts
│   │   ├── SuperuserController.ts
│   │   └── TicketController.ts
│   ├── interfaces/
│   │   ├── EmailService.ts
│   │   ├── Job.ts
│   │   ├── NotificationStrategy.ts
│   │   └── TicketEvent.ts
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   └── superuserMiddleware.ts
│   ├── models/
│   │   ├── NotificationModel.ts
│   │   ├── OTPModel.ts
│   │   ├── ProjectModel.ts
│   │   ├── TicketModel.ts
│   │   └── UserModel.ts
│   ├── routes/
│   │   ├── AuthRoutes.ts
│   │   ├── ProjectRoutes.ts
│   │   ├── SuperuserRoutes.ts
│   │   └── TicketRoutes.ts
│   ├── services/
│   │   ├── EmailNotificationStrategy.ts
│   │   ├── NodemailerEmailService.ts
│   │   ├── NotificationContext.ts
│   │   ├── NotificationService.ts
│   │   ├── OTPService.ts
│   │   ├── SocketService.ts
│   │   └── UINotificationStrategy.ts
│   ├── workers/
│   │   └── emailWorker.ts
│   ├── app.ts
│   ├── inversify.config.ts
│   ├── server.ts
│   └── types.ts
├── .env
├── .eslintrc.js
├── .prettierrc.json
├── nodemon.json
├── package.json
└── tsconfig.json
```

## API Endpoints

### Authentication

*   `POST /api/auth/send-otp`: Send an OTP to the user's email.
*   `POST /api/auth/verify-otp`: Verify the OTP and get a JWT.

### Projects

*   `POST /api/projects`: Create a new project.
*   `GET /api/projects`: Get a list of projects for the logged-in user.
*   `GET /api/projects/:projectId`: Get a project by its ID.
*   `PUT /api/projects/:projectId`: Update a project.
*   `DELETE /api/projects/:projectId`: Delete a project.

### Tickets

*   `POST /api/projects/:projectId/tickets`: Create a new ticket for a project.
*   `GET /api/projects/:projectId/tickets`: Get a list of tickets for a project.
*   `GET /api/projects/:projectId/tickets/:id`: Get a ticket by its ID.
*   `PUT /api/projects/:projectId/tickets/:id`: Update a ticket's status or description.
*   `DELETE /api/projects/:projectId/tickets/:id`: Delete a ticket.

### Superuser

*   `POST /api/superuser/toggle`: Toggle the superuser view.

## Design Pattern Explanation

### Strategy Pattern

The Strategy pattern is used for the notification system. This pattern allows us to define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.

*   **`INotificationStrategy`:** This interface defines the `sendNotification` method that all concrete strategies must implement.
*   **`EmailNotificationStrategy`:** This is a concrete strategy that sends notifications via email.
*   **`UINotificationStrategy`:** This is a concrete strategy that sends notifications via Socket.IO.
*   **`NotificationContext`:** This class uses a concrete strategy to send notifications. It selects the strategy based on the user's online/offline state.

This pattern allows us to easily add new notification methods (e.g., SMS, push notifications) without changing the existing code.

### Dependency Injection

Dependency Injection (DI) is used to make the code more modular, testable, and maintainable. We are using InversifyJS for DI.

*   **`inversify.config.ts`:** This file contains the InversifyJS container and the bindings for the services.
*   **`@injectable()` and `@inject()` decorators:** These decorators are used to declare dependencies and inject them into the classes.

## Why MongoDB was chosen over SQL

MongoDB, a NoSQL database, was chosen for this project for the following reasons:

*   **Flexible Schema:** MongoDB's flexible schema allows for easier and faster development, especially in the early stages of a project where the data model is likely to change.
*   **Scalability:** MongoDB is designed to scale out horizontally, which makes it a good choice for applications that are expected to grow.
*   **Performance:** MongoDB can be very performant for read and write operations, especially for large amounts of data.
*   **JSON-like Documents:** MongoDB stores data in BSON, a binary representation of JSON. This makes it easy to work with data in modern web applications that use JSON extensively.

For a ticket dashboard application, the data is semi-structured and can evolve over time. MongoDB's document model is a good fit for this type of data.
