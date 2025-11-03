# React Course - Lesson 3: API Server (TypeScript)

A RESTful API server built with Express, MongoDB, and TypeScript following the MVC (Model-View-Controller) architecture pattern.

## 🏗️ Project Structure

```
server/
├── src/
│   ├── types/
│   │   └── product.types.ts   # TypeScript interfaces and types
│   ├── models/
│   │   └── Product.ts         # MongoDB schema with TypeScript
│   ├── controllers/
│   │   └── productController.ts  # Business logic with type safety
│   ├── routes/
│   │   └── products.ts        # API endpoints
│   └── index.ts               # Server entry point
├── dist/                      # Compiled JavaScript (generated)
├── tsconfig.json              # TypeScript configuration
└── package.json
```

## 📋 Architecture Overview

### **Type Definitions** (`src/types/`)
- Defines TypeScript interfaces and types
- Ensures type safety across the application
- Example: `product.types.ts` - IProduct interface, ProductCategory type

### **Model** (`src/models/`)
- Defines database schema using Mongoose with TypeScript generics
- Handles data validation and structure with type safety
- Example: `Product.ts` - Product schema with IProduct interface

### **Controller** (`src/controllers/`)
- Contains business logic with Express Request/Response types
- Interacts with models to perform CRUD operations
- Type-safe error handling
- Example: `productController.ts` - Fully typed async handlers

### **Route** (`src/routes/`)
- Defines API endpoints and HTTP methods
- Maps URLs to controller functions
- Example: `products.ts` - GET, POST, PUT, DELETE routes

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally)
- TypeScript knowledge (basic)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running locally on port 27017

3. Start the development server:

**Development mode (with hot reload and TypeScript):**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
npm start
```

**Type checking only:**
```bash
npm run type-check
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

- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework with @types/express
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM with TypeScript support
- **CORS** - Cross-origin resource sharing
- **ts-node** - TypeScript execution for development
- **nodemon** - Auto-restart on file changes

## 📝 TypeScript Features

### Type Safety
```typescript
interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    inStock: boolean;
}
```

### Typed Controllers
```typescript
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
};
```

### Type-safe Error Handling
```typescript
catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message });
}
```

## 📝 Sample Data

The server automatically seeds sample products on first run if the database is empty:
- iPhone 15 Pro
- MacBook Air M2
- Nike Air Max 270

## 🔧 Development Scripts

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript
- `npm run type-check` - Check types without emitting files
- `npm run dev:watch` - Watch mode with auto-restart

## 📚 Learning Objectives

This server demonstrates:
1. ✅ **TypeScript with Express** - Type-safe backend development
2. ✅ **MVC Architecture** - Separation of concerns
3. ✅ **Mongoose with TypeScript** - Type-safe database operations
4. ✅ **RESTful API Design** - Standard HTTP methods
5. ✅ **Type Definitions** - Custom interfaces and types
6. ✅ **Error Handling** - Type-safe error responses
7. ✅ **Modern Development** - ts-node, nodemon, hot reload

## 🎯 TypeScript Benefits

1. **Compile-time Type Checking** - Catch errors before runtime
2. **IntelliSense Support** - Better IDE autocomplete
3. **Refactoring Safety** - Rename with confidence
4. **Self-documenting Code** - Types serve as documentation
5. **Better Collaboration** - Clear contracts between modules

