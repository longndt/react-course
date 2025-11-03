# React Course - Lesson 3: API Server

A RESTful API server built with Express, MongoDB, and ES6 modules following the MVC (Model-View-Controller) architecture pattern.

## 🏗️ Project Structure

```
server/
├── api/
│   ├── controllers/       # Business logic
│   │   └── productController.js
│   ├── models/            # Database schemas
│   │   └── Product.js
│   └── routes/            # API endpoints
│       └── products.js
├── index.js               # Server entry point
└── package.json
```

## 📋 Architecture Overview

### **Model** (`api/models/`)
- Defines database schema using Mongoose
- Handles data validation and structure
- Example: `Product.js` - Product schema with name, description, price, category, inStock

### **Controller** (`api/controllers/`)
- Contains business logic for handling requests
- Interacts with models to perform CRUD operations
- Example: `productController.js` - getAllProducts, getProductById, createProduct, updateProduct, deleteProduct

### **Route** (`api/routes/`)
- Defines API endpoints and HTTP methods
- Maps URLs to controller functions
- Example: `products.js` - GET, POST, PUT, DELETE routes for `/api/products`

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or connection URI)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running locally on the default port (27017)

3. Start the server:

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## 📡 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Example Request Body (POST/PUT):
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "electronics",
  "inStock": true
}
```

### Valid Categories:
- `electronics`
- `clothing`
- `books`
- `home`
- `sports`
- `other`

## 🛠️ Technologies Used

- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **ES6 Modules** - Modern JavaScript module system

## 📝 Sample Data

The server automatically seeds sample products on first run if the database is empty:
- iPhone 15 Pro
- MacBook Air M2
- Nike Air Max 270

## 🔧 Development

The project uses ES6 modules (`import/export`) syntax. Make sure your `package.json` has:
```json
{
  "type": "module"
}
```

## 📚 Learning Objectives

This server demonstrates:
1. ✅ **MVC Architecture** - Separation of concerns
2. ✅ **ES6 Modules** - Modern JavaScript syntax
3. ✅ **RESTful API Design** - Standard HTTP methods
4. ✅ **MongoDB Integration** - NoSQL database operations
5. ✅ **Error Handling** - Proper error responses
6. ✅ **Data Validation** - Schema validation with Mongoose

