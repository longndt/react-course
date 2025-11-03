import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './ProductList.css';

const API_BASE_URL = 'http://localhost:3001/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Failed to fetch products: ${err.message}`);
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      alert('Failed to delete product');
      console.error('Error deleting product:', err);
    }
  };

  const handleToggleStock = async (product) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${product._id}`, {
        ...product,
        inStock: !product.inStock
      });
      setProducts(products.map(p => 
        p._id === product._id ? response.data : p
      ));
    } catch (err) {
      alert('Failed to update product');
      console.error('Error updating product:', err);
    }
  };

  if (loading) {
    return (
      <div className="product-list-container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-container">
        <div className="error-message">
          <strong>Error:</strong> {error}
          <button onClick={fetchProducts} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>Products ({products.length})</h2>
        <button onClick={fetchProducts} className="refresh-button">
          🔄 Refresh
        </button>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No products found. Add your first product!</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <div className="product-header">
                <h3>{product.name}</h3>
                <span className={`category-badge ${product.category}`}>
                  {product.category}
                </span>
              </div>
              
              <p className="product-description">{product.description}</p>
              
              <div className="product-details">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
              </div>

              <div className="product-actions">
                <button 
                  onClick={() => handleToggleStock(product)}
                  className="btn btn-toggle"
                >
                  Toggle Stock
                </button>
                <button 
                  onClick={() => handleDelete(product._id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>

              {product.createdAt && (
                <div className="product-meta">
                  Added: {new Date(product.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ProductList.propTypes = {
  // No props currently, but kept for future extensions
};

export default ProductList;

