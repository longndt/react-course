# Lesson 4: Working with Data and APIs

## Overview

This lesson covers how to integrate external APIs and manage data in React applications, using MockAPI for practical, hands-on examples.

## Prerequisites

- Completion of Lessons 1-3
- Basic understanding of HTTP and REST APIs
- Familiarity with async/await and Promises

## Core Concepts

### 1. Understanding APIs (Application Programming Interfaces)

#### What is an API?
Think of an API like a restaurant service:
- You (frontend) are the customer
- The kitchen (backend) prepares the data
- The API is the waiter who takes your requests and brings back data

#### What is a REST API?
- REST = REpresentational State Transfer
- Most common way to organize APIs
- Example endpoints:
  ```
  # Get list of products
  GET https://api.shop.com/products

  # Get product details with id = 1
  GET https://api.shop.com/products/1

  # Add new product
  POST https://api.shop.com/products

  # Update product with id = 1
  PUT https://api.shop.com/products/1

  # Delete product with id = 1
  DELETE https://api.shop.com/products/1
  ```

#### HTTP Methods
- GET: Retrieve data (like viewing a menu)
- POST: Create new data (like placing an order)
- PUT/PATCH: Update data (like modifying an order)
- DELETE: Remove data (like canceling an order)

#### Status Codes
- 200 OK: Request successful
- 201 Created: Resource created successfully
- 400 Bad Request: Invalid request
- 401 Unauthorized: Authentication required
- 403 Forbidden: No permission
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server error

### 2. Working with APIs in React

#### Basic Data Fetching with Fetch API
```jsx
// Get list of products
fetch('https://api.shop.com/products')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))

// Add new product
fetch('https://api.shop.com/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Classic T-Shirt',
    price: 29.99
  })
})
```

#### Handling Loading and Error States
```jsx
function ProductList() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.shop.com/products')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        return res.json()
      })
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading products...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="products">
      {data.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### 3. React Query - Modern Data Fetching Library

#### Why Use React Query?
1. Cleaner, more readable code
2. Automatic loading and error states
3. Built-in data caching
4. Automatic background updates
5. Zero-configuration optimizations

#### Example Implementation:
```jsx
// Setting up React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // Data considered fresh for 5 minutes
      retry: 3,                   // Retry failed requests 3 times
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  )
}

// Custom hook for products
function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('https://api.shop.com/products')
      if (!res.ok) {
        throw new Error('Failed to fetch products')
      }
      return res.json()
    }
  })
}

// Using the hook
function ProductList() {
  const {
    data: products,
    isLoading,
    error,
    refetch
  } = useProducts()

  if (isLoading) return <div>Loading products...</div>
  if (error) return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={refetch}>Try Again</button>
    </div>
  )

  return (
    <div className="products">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### 4. MockAPI Setup

#### Creating Resources
1. Products
```json
{
  "id": "1",
  "name": "Classic T-Shirt",
  "price": 29.99,
  "description": "Comfortable cotton t-shirt",
  "imageUrl": "https://example.com/tshirt.jpg",
  "category": "clothing"
}
```

2. Cart
```json
{
  "id": "1",
  "userId": "1",
  "productId": "1",
  "quantity": 1,
  "addedAt": "2023-09-10T08:30:00Z"
}
```

3. Orders
```json
{
  "id": "1",
  "userId": "1",
  "products": [
    {
      "id": "1",
      "quantity": 2,
      "price": 29.99
    }
  ],
  "total": 59.98,
  "status": "pending",
  "createdAt": "2023-09-10T09:00:00Z"
}
```

#### API Structure
```
# Products
GET    /products      - Get all products
GET    /products/1    - Get product details
POST   /products      - Add new product
PUT    /products/1    - Update product
DELETE /products/1    - Delete product

# Similar endpoints for Cart and Orders
```

## Lab Exercises

### Exercise 1: Setting up MockAPI (30 minutes)
1. Create a MockAPI account
2. Create a new project
3. Set up the following resources:
   - Products
   - Cart
   - Orders
4. Add sample data to each resource
5. Test the API endpoints using Postman or browser

### Exercise 2: Product Catalog (45 minutes)
1. Create a new React project
2. Install and set up React Query
3. Create components:
   - ProductList
   - ProductCard
   - Loading spinner
   - Error message
4. Implement:
   - Product fetching
   - Loading states
   - Error handling
   - Basic styling

### Exercise 3: Shopping Cart (45 minutes)
1. Implement cart functionality:
   - Add to cart
   - Remove from cart
   - Update quantities
   - Calculate total
2. Add error handling
3. Use React Query mutations
4. Add loading states

### Exercise 4: Checkout Process (60 minutes)
1. Create checkout form
2. Implement order creation
3. Add order confirmation
4. Handle success/error states
5. Show order history

## Project Structure
```
src/
├── api/
│   ├── client.js        # API configuration
│   ├── products.js      # Product endpoints
│   ├── cart.js          # Cart endpoints
│   └── orders.js        # Order endpoints
├── components/
│   ├── ProductList.jsx
│   ├── ProductCard.jsx
│   ├── Cart.jsx
│   └── OrderHistory.jsx
├── hooks/
│   ├── useProducts.js
│   ├── useCart.js
│   └── useOrders.js
└── pages/
    ├── Products.jsx
    ├── Cart.jsx
    └── Orders.jsx
```

## Additional Resources
- [React Query Documentation](https://tanstack.com/query/latest)
- [MockAPI Documentation](https://mockapi.io/docs)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [REST API Best Practices](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)

## Practice Projects
1. E-commerce Store
   - Product listing
   - Shopping cart
   - Checkout process
   - Order history

2. Task Manager
   - Task list
   - Task creation
   - Status updates
   - Task filtering

3. Blog Platform
   - Post list
   - Post creation
   - Comments
   - User profiles
