# E-commerce Backend (MERN)

This repository contains a Node.js and Express-based backend for an e-commerce platform. It includes authentication for users and admins, product catalog management, cart and review workflows, invoice handling, dashboard metrics, file uploads, and payment callback support.

## Overview

The application is organized around a modular REST API structure with separate layers for routes, controllers, services, repositories, models, and middleware. All API routes are mounted under `/api/v1`, and the server exposes a health check endpoint at `/health`.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Zod validation
- Multer for file uploads
- Pino for structured logging
- Cookie parsing and CORS
- Faker-based seed data generation

## Project Structure

```text
src/
  app.js                # Express app setup and middleware
  server.js             # Server bootstrap and DB connection
  config/               # DB and payment configuration
  controllers/          # Request handlers
  services/             # Business logic
  repositories/         # Database access layer
  models/               # Mongoose schemas/models
  routes/               # API route definitions
  middlewares/          # Auth, validation, error handling, uploads
  utils/                # Helpers, error objects, logger, token helpers
uploads/                # Uploaded files are stored here
seed.js                 # Database seeding script
```

## Features

- User and admin registration/login/logout
- Protected authentication using cookies and JWT
- Product, brand, and category CRUD operations
- Cart management for authenticated users
- Product review creation and management
- Invoice and order-related APIs
- Admin dashboard summary endpoint
- File upload and file listing/deletion support
- Payment callback routes for transaction handling
- Seed script to populate categories, brands, and products

## Prerequisites

- Node.js and npm installed
- A running MongoDB instance

## Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create a local environment file

```bash
cp example.env .env
```

## Environment Variables

Set the following values in your `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce
MONGO_URI_LOCAL=mongodb://localhost:27017/ecommerce
LOG_LEVEL=info
NODE_ENV=development
JWT_SECRET=your_jwt_secret
Jwt_expires_in=7d
COOKIE_EXPIRE=7d

# Optional payment integration values
SSLCZ_STORE_ID=
SSLCZ_STORE_PASSWD=
SSLCZ_CURRENCY=
SSLCZ_SUCCESS_URL=
SSLCZ_FAIL_URL=
SSLCZ_CANCEL_URL=
SSLCZ_IPN_URL=
SSLCZ_INIT_URL=
```

Notes:

- The main application uses `MONGO_URI` for database connection.
- The seed script uses `MONGO_URI_LOCAL`.
- `JWT_SECRET` should be a long, secure random string.

## Running the Server

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

The server will start on the port defined by `PORT` (default: `3000`).

## Seeding Sample Data

To populate the database with sample categories, brands, and products:

```bash
node seed.js
```

## API Base URL

All routes are mounted under:

```text
/api/v1
```

Health check:

```text
GET /health
```

## Route Overview

### Authentication

#### User routes

```text
POST /api/v1/user/register
POST /api/v1/user/login
GET  /api/v1/user/
GET  /api/v1/user/verify
GET  /api/v1/user/logout
PUT  /api/v1/user/update
DELETE /api/v1/user/delete
```

#### Admin routes

```text
POST /api/v1/admin/register
POST /api/v1/admin/login
GET  /api/v1/admin/
GET  /api/v1/admin/verify
GET  /api/v1/admin/logout
PUT  /api/v1/admin/update
```

### Catalog

```text
GET    /api/v1/products
POST   /api/v1/products
GET    /api/v1/products/:id
PUT    /api/v1/products/:id
DELETE /api/v1/products/:id

GET  /api/v1/brands
POST /api/v1/brands/create
GET  /api/v1/brands/:id
PUT  /api/v1/brands/:id
DELETE /api/v1/brands/:id

GET  /api/v1/categories
POST /api/v1/categories/create
GET  /api/v1/categories/:id
PUT  /api/v1/categories/:id
DELETE /api/v1/categories/:id
```

### User Features

```text
POST /api/v1/cart
GET  /api/v1/cart
PUT  /api/v1/cart/update/:cart_id
DELETE /api/v1/cart/delete/:cart_id

POST /api/v1/reviews
GET  /api/v1/reviews/all
GET  /api/v1/reviews/product/:productId
GET  /api/v1/reviews/user/:userId
PUT  /api/v1/reviews/:id
DELETE /api/v1/reviews/:id

POST /api/v1/invoices
GET  /api/v1/invoices/all
GET  /api/v1/invoices/single/:invoice_id
GET  /api/v1/invoices/invoice-product-list
GET  /api/v1/invoices/:id
PUT  /api/v1/invoices/:id
DELETE /api/v1/invoices/:id
```

### Admin and Business Operations

```text
GET /api/v1/orders
PUT /api/v1/orders/update
GET /api/v1/orders/export-csv

GET /api/v1/dashboard

POST /api/v1/files/upload
GET  /api/v1/files/all
POST /api/v1/files/delete
```

### Payment Callback Routes

```text
POST /api/v1/payment/success/:trx_id
POST /api/v1/payment/cancel/:trx_id
POST /api/v1/payment/fail/:trx_id
POST /api/v1/payment/ipn/:trx_id
```

## Authentication Behavior

- User authentication uses the `u_token` cookie.
- Admin authentication uses the `a_token` cookie.
- Protected routes are enforced by the auth middleware in the `src/middlewares` directory.

## File Uploads

Uploaded files are stored under the `uploads/` directory and can be served through the static route:

```text
/api/v1/get-file/filename
```

## Notes

- The project currently exposes a basic product CRUD API. Search and filter endpoints are not active in the current route setup.
- The application includes centralized error handling and a not-found middleware.
- Automated test coverage is not configured in the current package setup.

## Example Request

```bash
curl -X POST http://localhost:3000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"secret123"}'
```

## Author

Md. Mahfuzur Rahman
