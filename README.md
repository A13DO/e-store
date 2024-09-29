# E-Store
Angular Full Stack ([MEAN Stack](#MEAN-Stack)) application for users to browse and purchase products, manage their shopping cart, and handle orders efficiently. This application features user authentication, product listings, and an admin dashboard for managing inventory.

## Live Web Project
Visit the Store as Customer [Store Demo](https://e-commerce-86f86.web.app). <br>
Visit the Store Dashboard as Admin [Dashboard Demo](https://dashboard-5b2fd.web.app/dashboard).
*(please be patient, it may take a minute to load)*

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)

## Features
### Customer Side
- **User Authentication**: Sign up or sign in to your own profile using JWT for secure user sessions.
- **Product Search**: Users can browse, search, and filter products by categories and view detailed product pages.
- **Cart and Wishlist Management**: Add or delete products from your cart and wishlist.
- **Order Submission**: Submit your order (order: selected products from your cart and user information) to the [backend](#Admin-Side-Dashboard).

### Admin Side (Dashboard)
- **Admin Dashboard**: Admin can manage products, orders, and users accounts.
- **Product Management**: View all products, and create, update, or delete products in the shop.
- **Order Management**: View all submitted orders along with customer information.


## Technologies Used
### MEAN Stack
- **[MongoDB](https://www.mongodb.com/)**: NoSQL database for storing product and user data.
- **[Angular](https://angular.io/)**: Frontend framework for building the user interface.
- **[Express.js](https://expressjs.com/)**: Web framework for Node.js for handling requests.
- **[Node.js](https://nodejs.org/)**: JavaScript runtime for server-side development.
### Other tools and technologies used
- **[Mongoose](https://mongoosejs.com/)**: ODM library for MongoDB to model application data.
- **[JWT (JSON Web Tokens)](https://jwt.io/)**: Used for secure user authentication, ensuring that user sessions are protected.
- **[Bcrypt.js](https://www.npmjs.com/package/bcrypt)**: Library for hashing passwords to enhance security in user authentication.
- **[Bootstrap](https://getbootstrap.com/)**: CSS framework for responsive design.
- **[PrimeNG](https://www.primefaces.org/primeng/)**: A rich UI component library for Angular applications.
- **[Angular Material](https://material.angular.io/)**: A set of reusable UI components that implement Google's Material Design.


## Getting Started

*Prerequisites*
1. Install Angular CLI:
   ```bash
   npm install -g @angular/cli

*Run*
1. In a new terminal, install the frontend dependencies:
   ```bash
   npm i
2. Start the Angular application as Customer:
   ```bash
   ng serve shop
3. Start the Angular application as Admin:
   ```bash
   ng serve admin

