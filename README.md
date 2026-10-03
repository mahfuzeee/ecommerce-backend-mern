# E-commerce Backend (MERN)

A Node.js + Express backend for an e-commerce platform with user and admin authentication, catalog management, cart and review flows, orders and invoices, dashboard data, file uploads, and payment callbacks.

## Overview

This project follows a modular backend structure with separate layers for routes, controllers, services, repositories, models, and middleware. The app is mounted under `/api/v1`, and a basic health check is exposed at `/health`.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- Zod validation
- Multer for file uploads
- Pino HTTP logging
- Cookie parsing and CORS
- Faker-based seed generation

## Project Structure

```text
src/
  app.js                 # Express setup, middleware, and route mounting
  server.js              # Server bootstrap and DB connection
  config/                # Database and payment config
  controllers/           # Request handlers
  services/              # Business logic
  repositories/          # Data access layer
  models/                # Mongoose schemas/models
  routes/                # API route definitions
  middlewares/           # Auth, validation, uploads, and error handling
  utils/                 # Helpers, logger, tokens, API response utilities
uploads/                 # Uploaded files are stored here
example.env              # Environment variable template
```

## Features

- User and admin registration/login/logout flows
- Cookie-based JWT authentication with `u_token` and `a_token`
- Product, brand, category CRUD APIs
- Cart management for authenticated users
- Review creation, listing, updating, and deletion
- Invoice generation and retrieval flows
- Order listing and admin order updates
- Dashboard summary endpoint for admins
- File upload and listing support
- Payment success/cancel/fail/IPN callback routes

## Prerequisites

- Node.js 18+ recommended
- npm
- A running MongoDB instance

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create an environment file:

```bash
cp example.env .env
```

4. Update the values in `.env` before starting the app.

## Environment Variables

Use the variables below in your `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce
LOG_LEVEL=info
NODE_ENV=development
JWT_SECRET=your_secure_jwt_secret
Jwt_expires_in=7d
COOKIE_EXPIRE=7d

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

- The application connects using `MONGO_URI`.
- `JWT_SECRET` should be a long, random value.
- Payment variables are optional and are used by the payment callback logic.

## Run the Server

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

The API will run on the port from `PORT` (default: `3000`).

## API Base URL

All API routes are mounted under:

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

GET  /api/v1/brands/
POST /api/v1/brands/create
GET  /api/v1/brands/:id
PUT  /api/v1/brands/:id
DELETE /api/v1/brands/:id

GET  /api/v1/categories/
POST /api/v1/categories/create
GET  /api/v1/categories/:id
PUT  /api/v1/categories/:id
DELETE /api/v1/categories/:id
```

### User Features

```text
POST /api/v1/cart/
GET  /api/v1/cart/
PUT  /api/v1/cart/update/:cart_id
DELETE /api/v1/cart/delete/:cart_id

POST /api/v1/reviews/
GET  /api/v1/reviews/all
GET  /api/v1/reviews/product/:productId
GET  /api/v1/reviews/user/:userId
PUT  /api/v1/reviews/:id
DELETE /api/v1/reviews/:id

POST /api/v1/invoices/
GET  /api/v1/invoices/all
GET  /api/v1/invoices/single/:invoice_id
GET  /api/v1/invoices/invoice-product-list
GET  /api/v1/invoices/:id
PUT  /api/v1/invoices/:id
DELETE /api/v1/invoices/:id
```

### Admin and Business Operations

```text
GET /api/v1/orders/
PUT /api/v1/orders/update
GET /api/v1/orders/export-csv

GET /api/v1/dashboard/

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

### Static File Access

Uploaded files are served from the public static route below:

```text
/api/v1/get-file/:filename
```

## Authentication Behavior

- User-authenticated routes expect the `u_token` cookie.
- Admin-authenticated routes expect the `a_token` cookie.
- Protected routes are enforced in the middleware under `src/middlewares`.

## Notes

- Product search and filter endpoints are present in the controller layer but are currently commented out in the route setup.
- The project includes centralized error handling and a not-found middleware.
- `npm test` is still a placeholder in the package scripts and is not configured with automated tests yet.

## Example Request

```bash
curl -X POST http://localhost:3000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"secret123"}'
```

## Author

Md. Mahfuzur Rahman
