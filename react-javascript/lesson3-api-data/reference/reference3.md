# Reference - API Integration & Data Management

## Table of Contents
1. [Express Backend Setup](#1-express-backend-setup)
2. [Axios Setup & Configuration](#2-axios-setup--configuration)
3. [API Client Patterns with Axios](#3-api-client-patterns-with-axios)
4. [Data Fetching Components](#4-data-fetching-components)
5. [CRUD Operations with Axios](#5-crud-operations-with-axios)
6. [Error Handling & Loading States](#6-error-handling--loading-states)
7. [Advanced Patterns](#7-advanced-patterns)
8. [Complete Examples](#8-complete-examples)

---

## 1. Express Backend Setup

### Basic Express Server with CORS

```javascript
// server/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data (replace with MongoDB later)
let products = [
  { id: 1, name: 'iPhone 15 Pro', price: 999.99, category: 'electronics', inStock: true },
  { id: 2, name: 'MacBook Air', price: 1199.99, category: 'electronics', inStock: true },
];

// GET - Fetch all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET - Fetch single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// POST - Create new product
app.post('/api/products', (req, res) => {
  const { name, price, category } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
    inStock: true,
    createdAt: new Date().toISOString()
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT - Update product
app.put('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  products[productIndex] = { ...products[productIndex], ...req.body };
  res.json(products[productIndex]);
});

// DELETE - Delete product
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### MongoDB Integration

```javascript
// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { 
    type: String, 
    required: true,
    enum: ['electronics', 'clothing', 'books', 'home', 'sports', 'other']
  },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
```

---

## 2. Axios Setup & Configuration

### Basic Axios Installation

```bash
npm install axios
```

### Axios Configuration

```javascript
// services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    console.log(`Response received from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`API Error: ${error.message}`);
    return Promise.reject(error);
  }
);

export default axios;
```

### PropTypes for Type Safety

```javascript
// types/product.js
import PropTypes from 'prop-types';

export const ProductShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.oneOf(['electronics', 'clothing', 'books', 'home', 'sports', 'other']).isRequired,
  inStock: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
});

export const CreateProductInputShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
});
```

---

## 3. API Client Patterns with Axios

### Product API Service

```javascript
// services/productApi.js
import axios from './api';

const API_BASE_URL = 'http://localhost:3001/api';

export const productApi = {
  // Get all products
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  },

  // Get single product
  getById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  },

  // Create new product
  create: async (productData) => {
    const response = await axios.post(`${API_BASE_URL}/products`, productData);
    return response.data;
  },

  // Update product
  update: async ({ _id, ...updateData }) => {
    const response = await axios.put(`${API_BASE_URL}/products/${_id}`, updateData);
    return response.data;
  },

  // Delete product
  delete: async (id) => {
    await axios.delete(`${API_BASE_URL}/products/${id}`);
  },
};
```

### Error Handling Service

```javascript
// services/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return `Server Error: ${error.response.data.message || error.message}`;
  } else if (error.request) {
    // Request was made but no response received
    return 'Network Error: Please check your connection';
  } else {
    // Something else happened
    return `Request Error: ${error.message}`;
  }
};
```

---

## 4. Data Fetching Components

### Product List Component

```javascript
// components/ProductList.jsx
import { useState, useEffect } from 'react';
import { productApi } from '../services/productApi';
import { handleApiError } from '../services/errorHandler';
import { ProductShape } from '../types/product';
import PropTypes from 'prop-types';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productApi.getAll();
      setProducts(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="product-list">
      <h2>Products ({products.length})</h2>
      {products.map(product => (
        <div key={product._id} className="product-card">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="product-details">
            <span className="price">${product.price}</span>
            <span className="category">{product.category}</span>
            <span className={`stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = {
  // No props for this component
};

export default ProductList;
```

### Product Form Component

```javascript
// components/ProductForm.jsx
import { useState } from 'react';
import { productApi } from '../services/productApi';
import { handleApiError } from '../services/errorHandler';
import { CreateProductInputShape } from '../types/product';
import PropTypes from 'prop-types';

const ProductForm = ({ onProductCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'electronics',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim() || formData.price <= 0) {
      setError('Please fill in all fields with valid values.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await productApi.create(formData);
      setFormData({ name: '', description: '', price: 0, category: 'electronics' });
      onProductCreated();
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>Add New Product</h3>
      
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price ($)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="home">Home & Garden</option>
          <option value="sports">Sports</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Product'}
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

ProductForm.propTypes = {
  onProductCreated: PropTypes.func.isRequired,
};

export default ProductForm;
```

---

## 5. CRUD Operations with Axios

### Complete CRUD Implementation

```javascript
// hooks/useProducts.js
import { useState, useEffect } from 'react';
import { productApi } from '../services/productApi';
import { handleApiError } from '../services/errorHandler';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productApi.getAll();
      setProducts(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    try {
      const newProduct = await productApi.create(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      throw new Error(handleApiError(err));
    }
  };

  const updateProduct = async (updateData) => {
    try {
      const updatedProduct = await productApi.update(updateData);
      setProducts(prev => prev.map(p => 
        p._id === updateData._id ? updatedProduct : p
      ));
      return updatedProduct;
    } catch (err) {
      throw new Error(handleApiError(err));
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productApi.delete(id);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      throw new Error(handleApiError(err));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
};
```

---

## 6. Error Handling & Loading States

### Loading Component

```javascript
// components/LoadingSpinner.jsx
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="loading-container">
      <div className={`spinner ${sizeClasses[size]}`}></div>
      <p className="loading-text">{text}</p>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  text: PropTypes.string,
};

export default LoadingSpinner;
```

### Error Display Component

```javascript
// components/ErrorDisplay.jsx
import PropTypes from 'prop-types';

const ErrorDisplay = ({ error, onRetry, showRetry = true }) => {
  return (
    <div className="error-display">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3>Something went wrong</h3>
        <p>{error}</p>
        {showRetry && onRetry && (
          <button onClick={onRetry} className="retry-button">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

ErrorDisplay.propTypes = {
  error: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
  showRetry: PropTypes.bool,
};

export default ErrorDisplay;
```

### Skeleton Loading

```javascript
// components/SkeletonLoader.jsx
const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-description"></div>
          <div className="skeleton-line skeleton-price"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
```

---

## 7. Advanced Patterns

### Custom Hooks for API Calls

```javascript
// hooks/useApi.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useApi({ url, immediate = true, onSuccess, onError }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(url);
      setData(response.data);
      onSuccess?.(response.data);
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [url, immediate]);

  return { data, loading, error, execute };
}
```

### API Service Layer

```javascript
// services/apiService.js
import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`Response received from ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error(`API Error: ${error.message}`);
        return Promise.reject(error);
      }
    );
  }

  async get(url) {
    const response = await this.client.get(url);
    return response.data;
  }

  async post(url, data) {
    const response = await this.client.post(url, data);
    return response.data;
  }

  async put(url, data) {
    const response = await this.client.put(url, data);
    return response.data;
  }

  async delete(url) {
    const response = await this.client.delete(url);
    return response.data;
  }
}

export const apiService = new ApiService('http://localhost:3001/api');
```

### Error Boundary Component

```javascript
// components/ErrorBoundary.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

export default ErrorBoundary;
```

### Optimistic Updates

```javascript
// hooks/useOptimisticUpdate.js
import { useState } from 'react';
import axios from 'axios';

export function useOptimisticUpdate({ updateFn, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);

  const execute = async (data, optimisticData) => {
    try {
      setLoading(true);
      
      // Update UI immediately (optimistic)
      onSuccess?.(optimisticData);
      
      // Make actual API call
      const result = await updateFn(data);
      
      // Update with real data
      onSuccess?.(result);
    } catch (error) {
      const errorMessage = error.message || 'Update failed';
      onError?.(errorMessage);
      
      // Revert optimistic update
      onSuccess?.(data);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading };
}
```

### Retry Logic

```javascript
// utils/retry.js
export async function retry(fn, maxAttempts = 3, delay = 1000) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts) {
        throw lastError;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError;
}

// Usage
const fetchData = async () => {
  return await retry(
    () => axios.get('/api/data'),
    3, // max attempts
    1000 // initial delay
  );
};
```

### Performance Optimization

```javascript
// hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage in search
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  if (debouncedSearchTerm) {
    // Perform search API call
    searchProducts(debouncedSearchTerm);
  }
}, [debouncedSearchTerm]);
```

---

## 8. Complete Examples

### Main App Component

```javascript
// App.jsx
import { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductCreated = () => {
    setRefreshKey(prev => prev + 1);
    setShowForm(false);
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <header className="app-header">
          <h1>Product Catalog</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Hide Form' : 'Add New Product'}
          </button>
        </header>

        <main className="app-main">
          {showForm && (
            <div className="form-section">
              <ProductForm onProductCreated={handleProductCreated} />
            </div>
          )}

          <div className="products-section">
            <ProductList key={refreshKey} />
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
```

### Best Practices Summary

1. **Create reusable API hooks** for common patterns
2. **Implement error boundaries** for graceful error handling
3. **Use optimistic updates** for better user experience
4. **Add retry logic** for failed requests
5. **Implement debouncing** for search and input fields
6. **Use PropTypes** for type safety in JavaScript
7. **Add loading states** for better UX
8. **Implement proper error messages** for users
9. **Create API service layer** for centralized API management
10. **Use interceptors** for common functionality like logging and error handling