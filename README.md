# Ticket Dashboard Application

This is a full-stack ticket dashboard application with real-time updates, built with Node.js, Express, TypeScript, React, and Socket.IO.

## Tech Stack

**Backend:**
*   Node.js
*   Express
*   TypeScript
*   MongoDB (Mongoose)
*   Socket.IO
*   Nodemailer
*   InversifyJS (Dependency Injection)

**Frontend:**
*   React
*   TypeScript
*   Vite
*   Redux Toolkit
*   React Router
*   Axios
*   Socket.IO Client
*   Tailwind CSS
*   react-beautiful-dnd

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project root directory:**
    ```bash
    cd "Ticket Dashboard"
    ```

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file:**
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
4.  **Start the development server:**
    ```bash
    npm run dev
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```

## Folder Structure

```
. (project root)
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── interfaces/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── workers/
│   │   ├── app.ts
│   │   ├── inversify.config.ts
│   │   ├── server.ts
│   │   └── types.ts
│   ├── .env
│   ├── .eslintrc.js
│   ├── .prettierrc.json
│   ├── nodemon.json
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── hooks/
│   │   ├── interfaces/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
└── README.md
```

## Available Scripts

### Backend

*   `npm install`: Install backend dependencies.
*   `npm run dev`: Start the backend development server (with nodemon).
*   `npm run build`: Build the backend for production.

### Frontend

*   `npm install --prefix frontend`: Install frontend dependencies.
*   `npm run dev --prefix frontend`: Start the frontend development server.
*   `npm run build --prefix frontend`: Build the frontend for production.

## API Integration Points

The frontend interacts with the backend through the following API endpoints:

### Authentication

*   `POST /api/auth/send-otp`: Sends a 6-digit OTP to the provided email address.
*   `POST /api/auth/verify-otp`: Verifies the OTP and returns a JWT upon successful verification.

### Projects

*   `POST /api/projects`: Creates a new project. (Requires JWT)
*   `GET /api/projects`: Retrieves all projects associated with the authenticated user. (Requires JWT)
*   `GET /api/projects/:projectId`: Retrieves a specific project by ID. (Requires JWT)
*   `PUT /api/projects/:projectId`: Updates an existing project. (Requires JWT)
*   `DELETE /api/projects/:projectId`: Deletes a project. (Requires JWT)

### Tickets

*   `POST /api/projects/:projectId/tickets`: Creates a new ticket within a specified project. (Requires JWT)
*   `GET /api/projects/:projectId/tickets`: Retrieves all tickets for a specified project. (Requires JWT)
*   `GET /api/projects/:projectId/tickets/:id`: Retrieves a specific ticket by ID. (Requires JWT)
*   `PUT /api/projects/:projectId/tickets/:id`: Updates a specific ticket. (Requires JWT)
*   `DELETE /api/projects/:projectId/tickets/:id`: Deletes a specific ticket. (Requires JWT)

### Superuser

*   `POST /api/superuser/toggle`: Toggles the superuser view mode, requiring a password from the backend's `.env` file. (Requires JWT and superuser privileges)

## Real-time Socket Flow

The application uses Socket.IO for real-time updates, ensuring that changes made by one user are instantly reflected for others viewing the same project.

1.  **Connection:** Frontend clients connect to the Socket.IO server, providing their `userId` for authentication.
2.  **Joining Projects:** Clients emit a `joinProject` event with a `projectId` to subscribe to updates for that specific project.
3.  **Ticket Updates:**
    *   When a ticket is created or updated via the REST API, the backend emits `ticketCreated` or `ticketUpdated` events to all clients in the relevant project room.
    *   The frontend listens for these events and dispatches Redux actions (`addTicket`, `updateTicketInList`) to update the local state.
4.  **Notifications:**
    *   The backend emits a `notification` event to a specific `userId` when a relevant event occurs (e.g., a ticket update).
    *   The frontend listens for these `notification` events and dispatches a Redux action (`addNotification`) to display the notification.
5.  **Offline Notifications:** For offline users, notifications are sent via email using a background worker.

## Design Pattern Explanation

### Strategy Pattern

The Strategy pattern is used for the notification system. This pattern allows us to define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.

*   **`NotificationStrategy`:** This interface defines the `sendNotification` method that all concrete strategies must implement.
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