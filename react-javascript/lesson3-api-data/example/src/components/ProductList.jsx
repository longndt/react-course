import { useState, useEffect } from "react";
import axios from "axios";

// API base URL for real server
const API_BASE_URL = "/api";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('=== FETCHING PRODUCTS ===');
            console.log('API URL:', `${API_BASE_URL}/products`);

            const response = await axios.get(`${API_BASE_URL}/products`);
            console.log('API Response:', response);

            // Ensure response.data is an array
            if (!Array.isArray(response.data)) {
                throw new Error('API response is not an array. Expected product data.');
            }

            setProducts(response.data);
            console.log('Products fetched successfully:', response.data);
        } catch (err) {
            console.error("=== API ERROR ===");
            console.error("Error fetching products:", err);

            let errorMessage = "Failed to fetch products";

            if (axios.isAxiosError && axios.isAxiosError(err)) {
                console.error("Axios error details:", {
                    message: err.message,
                    status: err.response?.status,
                    data: err.response?.data
                });

                if (err.code === 'ECONNREFUSED' || err.message.includes('ECONNREFUSED')) {
                    errorMessage = "Cannot connect to server. Please make sure the backend server is running on port 3001.";
                } else if (err.response?.status === 404) {
                    errorMessage = "API endpoint not found. Please check the server configuration.";
                } else if (err.response?.status >= 500) {
                    errorMessage = "Server error. Please try again later.";
                } else if (err.message.includes('Network Error')) {
                    errorMessage = "Network error. Please check your connection and server status.";
                } else {
                    errorMessage = `API Error: ${err.message}`;
                }
            }

            console.log('Setting error message:', errorMessage);
            setError(errorMessage);
            setProducts([]); // Clear products on error
        } finally {
            setLoading(false);
            console.log('=== LOADING COMPLETE ===');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const updateProduct = async (productId, inStock) => {
        try {
            console.log('Updating product:', productId, 'inStock:', inStock);

            const response = await axios.put(`${API_BASE_URL}/products/${productId}`, { inStock });

            // Update local state with response data
            setProducts(prev => prev.map(product =>
                product._id === productId
                    ? { ...product, inStock }
                    : product
            ));
            console.log('Product updated successfully:', response.data);
        } catch (err) {
            console.error("Error updating product:", err);
            let errorMessage = "Failed to update product";

            if (axios.isAxiosError && axios.isAxiosError(err)) {
                if (err.code === 'ECONNREFUSED' || err.message.includes('ECONNREFUSED')) {
                    errorMessage = "Cannot connect to server. Please make sure the backend server is running.";
                } else if (err.response?.status === 404) {
                    errorMessage = "Product not found or server endpoint unavailable.";
                } else {
                    errorMessage = `Update failed: ${err.message}`;
                }
            }

            setError(errorMessage);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            console.log('Deleting product:', productId);

            await axios.delete(`${API_BASE_URL}/products/${productId}`);

            // Update local state
            setProducts(prev => prev.filter(product => product._id !== productId));
            console.log('Product deleted successfully');
        } catch (err) {
            console.error("Error deleting product:", err);
            let errorMessage = "Failed to delete product";

            if (axios.isAxiosError && axios.isAxiosError(err)) {
                if (err.code === 'ECONNREFUSED' || err.message.includes('ECONNREFUSED')) {
                    errorMessage = "Cannot connect to server. Please make sure the backend server is running.";
                } else if (err.response?.status === 404) {
                    errorMessage = "Product not found or server endpoint unavailable.";
                } else {
                    errorMessage = `Delete failed: ${err.message}`;
                }
            }

            setError(errorMessage);
        }
    };

    console.log('=== RENDER STATE ===');
    console.log('Loading:', loading);
    console.log('Error:', error);
    console.log('Products count:', products.length);
    console.log('Products:', products);

    if (loading) return <div className="loading">Loading products...</div>;

    return (
        <div className="product-list">
            <div className="product-list-header">
                <h2>Products ({products.length})</h2>
            </div>

            {error && (
                <div className="error">
                    <p>{error}</p>
                    <button onClick={() => fetchProducts()}>Retry</button>
                </div>
            )}

            {products.length === 0 && !loading ? (
                <div className="no-products">
                    <p>No products found. Add your first product!</p>
                </div>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <div className="product-header">
                                <h3>{product.name}</h3>
                                <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                            <p className="description">{product.description}</p>
                            <div className="product-details">
                                <p className="price">${product.price.toFixed(2)}</p>
                                <p className="category">{product.category}</p>
                            </div>
                            <div className="product-actions">
                                <label className="stock-toggle">
                                    <input
                                        type="checkbox"
                                        checked={product.inStock}
                                        onChange={(e) => updateProduct(product._id, e.target.checked)}
                                    />
                                    Toggle Stock
                                </label>
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteProduct(product._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
