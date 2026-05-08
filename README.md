# ecommerce-backend-mern

A backend API for an e-commerce platform built with Node.js, Express, MongoDB, and Mongoose.

## Key Features

- JWT-based authentication for users and admins
- Product CRUD operations with search and filtering support
- Brand and category management protected by admin authorization
- Health check endpoint and central middleware handling
- Structured API versioning under `/api/v1`

## Tech Stack

- Node.js
- Express
- MongoDB / Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- Zod validation
- Pino logging
- Cookie parsing and CORS support

## Getting Started

### Install dependencies

```bash
npm install
```

### Environment variables

Copy `example.env` to `.env` and set the required values:

- `PORT` - app port (default: `3000`)
- `MONGO_URI_LOCAL` - MongoDB connection string
- `LOG_LEVEL` - logger level
- `NODE_ENV` - runtime environment
- `JWT_SECRET` - secret key for JWT signing
- `Jwt_expires_in` - JWT expiration time
- `COOKIE_EXPIRE` - cookie expiration time

### Start the server

```bash
npm run dev
```

or

```bash
npm start
```

## Server Entry Points

- `src/server.js` - application launcher and database connection
- `src/app.js` - Express app configuration and middleware

## API Base URL

All application routes are mounted under:

```
/api/v1
```

The health endpoint is available at:

```
/health
```

## Route Overview

### User Routes (`/api/v1/user`)

- `POST /register` — register a new user
- `POST /login` — login existing user
- `GET /` — get authenticated user info
- `GET /logout` — logout user
- `PUT /update` — update user profile
- `DELETE /delete` — delete user account

### Admin Routes (`/api/v1/admin`)

- `POST /register` — register a new admin
- `POST /login` — admin login
- `GET /` — get authenticated admin info
- `GET /verify` — verify admin token
- `GET /logout` — logout admin
- `PUT /update` — update admin profile

### Product Routes (`/api/v1/products`)

- `GET /` — list all products
- `POST /` — create a new product
- `GET /search` — search products
- `GET /filter` — filter products by category, brand, price, and sort. Also pgination.
- `GET /:id` — get product by ID
- `PUT /:id` — update product by ID
- `DELETE /:id` — delete product by ID

### Brand Routes (`/api/v1/brands`)

- `POST /create` — create a new brand (admin only)
- `GET /` — list all brands
- `GET /:id` — get brand by ID
- `PUT /:id` — update brand by ID (admin only)
- `DELETE /:id` — delete brand by ID (admin only)

### Category Routes (`/api/v1/categories`)

- `POST /create` — create a new category (admin only)
- `GET /` — list all categories
- `GET /:id` — get category by ID
- `PUT /:id` — update category by ID (admin only)
- `DELETE /:id` — delete category by ID (admin only)

## Middleware and Utilities

- `src/middlewares/authVerificationUser.js` — protects user routes
- `src/middlewares/authVerificationAdmin.js` — protects admin routes
- `src/middlewares/errorHandler.js` — catches and formats errors
- `src/middlewares/notFound.js` — handles unmatched routes
- `src/utils/ApiError.js` — custom API error helper
- `src/utils/apiResponse.js` — response formatting helper

## Notes

- `src/routes/orderRoutes.js` exists but is currently empty and not mounted into the main route tree.
- If order management is required, add route registration in `src/routes/index.js` and implement order controller logic.

## Example Request

```bash
curl -X POST http://localhost:3000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"secret123"}'
```

## Author

Md. Mahfuzur Rahman
