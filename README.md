# Collaborative Workspace API

A comprehensive backend API for a collaborative workspace platform built with Node.js, Express, PostgreSQL, MongoDB, and Redis.

## Features

- **Multi-database Architecture**
  - PostgreSQL for relational data (Users, Workspaces, Projects, Roles, Collaborators)
  - MongoDB for non-relational data (Activity Logs, Events, Job Results)
  - Redis for caching and Pub/Sub

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control
  - Password hashing with bcrypt

- **Real-time Features**
  - WebSocket support via Socket.IO
  - Redis Pub/Sub for real-time events

- **API Features**
  - RESTful API design
  - Request validation with Joi
  - Rate limiting
  - CORS support
  - Swagger API documentation
  - Comprehensive error handling

- **Security**
  - Helmet.js for security headers
  - Input validation
  - SQL injection protection (Sequelize ORM)
  - XSS protection

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Databases**: 
  - PostgreSQL (Sequelize ORM)
  - MongoDB (Mongoose ODM)
  - Redis
- **Authentication**: JWT, Passport.js
- **Validation**: Joi
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston
- **Real-time**: Socket.IO
- **Queue**: Bull (Redis-based)

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- MongoDB (v4 or higher)
- Redis (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shiva
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
# Server
NODE_ENV=development
PORT=3000
APP_NAME=Collaborative Workspace API

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=collaborative_workspace
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123

# MongoDB
MONGODB_URI=mongodb://localhost:27017/collaborative_workspace

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3001
WEBSOCKET_CORS_ORIGIN=http://localhost:3001

# Logging
LOG_LEVEL=info
```

4. Start the databases (PostgreSQL, MongoDB, Redis)

5. Initialize the database (creates tables and default roles):
```bash
npm run init-db
```

6. Run the server:
```bash
npm start
```

## API Documentation

Once the server is running, access the Swagger API documentation at:
```
http://localhost:3000/api-docs
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (Protected)

### Users
- `GET /api/v1/users` - Get all users (Admin only)
- `GET /api/v1/users/:id` - Get user by ID

### Workspaces
- `GET /api/v1/workspaces` - Get all workspaces for current user
- `GET /api/v1/workspaces/:id` - Get workspace by ID
- `POST /api/v1/workspaces` - Create workspace
- `PUT /api/v1/workspaces/:id` - Update workspace
- `DELETE /api/v1/workspaces/:id` - Delete workspace

### Projects
- `GET /api/v1/projects` - Get all projects
- `GET /api/v1/projects/:id` - Get project by ID
- `POST /api/v1/projects` - Create project
- `PUT /api/v1/projects/:id` - Update project
- `DELETE /api/v1/projects/:id` - Delete project

## Database Schema

### PostgreSQL Tables
- `users` - User accounts
- `workspaces` - Workspace entities
- `projects` - Project entities
- `collaborators` - Workspace membership
- `roles` - Role definitions

### MongoDB Collections
- `activitylogs` - User activity logs
- `events` - Real-time events
- `jobresults` - Background job results

## WebSocket Events

### Client → Server
- `join-workspace` - Join a workspace room
- `leave-workspace` - Leave a workspace room

### Server → Client
- `workspace:created` - Workspace created event
- `project:created` - Project created event

## Project Structure

```
shiva/
├── config/              # Configuration files
├── controllers/         # Route controllers
├── Logging/            # Database connection modules
├── middleware/         # Express middleware
├── models/             # Database models
│   ├── mongodb/        # Mongoose models
│   └── ...             # Sequelize models
├── routes/             # API routes
├── utils/              # Utility functions
├── validators/          # Joi validation schemas
├── server.js           # Main server file
└── index.js            # Configuration export
```


