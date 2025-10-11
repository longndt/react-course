import { useState, useEffect } from "react";
import axios from "axios";

// Use different API URLs based on mode
const API_BASE_URL = import.meta.env.MODE === 'mock' ? "/api" : "/api";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
    createdAt: string;
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('=== FETCHING PRODUCTS ===');
            console.log('Mode:', import.meta.env.MODE);
            console.log('API URL:', `${API_BASE_URL}/products`);

            const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
            console.log('API Response:', response);

            // Check if response is HTML (indicates MSW failed and we got the dev server page)
            if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
                throw new Error('MSW failed to start - received HTML instead of JSON. Please check MSW configuration.');
            }

            // Ensure response.data is an array
            if (!Array.isArray(response.data)) {
                throw new Error('Invalid API response - expected array but got: ' + typeof response.data);
            }

            setProducts(response.data);
            console.log('Products fetched successfully:', response.data);
        } catch (err: any) {
            console.error("=== API ERROR ===");
            console.error("Error fetching products:", err);

            let errorMessage = "Failed to fetch products";
            let useFallback = false;

            // Check if it's an MSW failure (our custom error)
            if (err.message && err.message.includes('MSW failed to start')) {
                errorMessage = "Mock API failed to start. Using fallback data for demonstration.";
                useFallback = true;
            } else if (axios.isAxiosError(err)) {
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

            if (useFallback) {
                console.log('MSW failed, using fallback mock data');
                const fallbackProducts = [
                    {
                        _id: '1',
                        name: 'iPhone 15 Pro',
                        description: 'Latest iPhone with advanced camera system and A17 Pro chip',
                        price: 999.99,
                        category: 'electronics',
                        inStock: true,
                        createdAt: '2024-01-01T00:00:00.000Z'
                    },
                    {
                        _id: '2',
                        name: 'MacBook Air M2',
                        description: 'Ultra-thin laptop with M2 chip and all-day battery life',
                        price: 1199.99,
                        category: 'electronics',
                        inStock: true,
                        createdAt: '2024-01-05T00:00:00.000Z'
                    },
                    {
                        _id: '3',
                        name: 'Nike Air Max 270',
                        description: 'Comfortable and stylish athletic shoes',
                        price: 150.00,
                        category: 'sports',
                        inStock: false,
                        createdAt: '2024-01-10T00:00:00.000Z'
                    }
                ];
                setProducts(fallbackProducts);
                setError(null); // Clear error since we have fallback data
            } else {
                setProducts([]); // Clear products on error
            }
        } finally {
            setLoading(false);
            console.log('=== LOADING COMPLETE ===');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const updateProduct = async (productId: string, inStock: boolean) => {
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
        } catch (err: any) {
            console.error("Error updating product:", err);
            let errorMessage = "Failed to update product";

            if (axios.isAxiosError(err)) {
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

    const deleteProduct = async (productId: string) => {
        try {
            console.log('Deleting product:', productId);

            await axios.delete(`${API_BASE_URL}/products/${productId}`);

            // Update local state
            setProducts(prev => prev.filter(product => product._id !== productId));
            console.log('Product deleted successfully');
        } catch (err: any) {
            console.error("Error deleting product:", err);
            let errorMessage = "Failed to delete product";

            if (axios.isAxiosError(err)) {
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
