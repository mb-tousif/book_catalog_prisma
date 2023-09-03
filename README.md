# Book Catalog Backend
## Description
This is a backend for a book catalog application. It is built to implement CRUD operations, pagination and filtering using Prisma, Postgres and Express. It is built with express.js and Typescript.

## Technologies Used
- [x] Express.js
- [x] Typescript
- [x] Prisma
- [x] Postgres
- [x] JWT
- [x] Bcrypt

### This is a link to the backend API hosted on vercel [Live Site](https://deploy-virid-one.vercel.app/)

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/users (GET)
- api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
- api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
- api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database
- [Bonus] api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
- api/v1/categories/6177a5b87d32123f08d2f5d4 (PATCH)
- api/v1/categories/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET) 
- [Bonus] api/v1/orders/:orderId (GET)
