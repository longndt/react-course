import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching products from:', `${API_BASE_URL}/products`);
            const response = await axios.get(`${API_BASE_URL}/products`);
            console.log('Products fetched successfully:', response.data);
            setProducts(response.data);
        } catch (err) {
            console.error("Error fetching products:", err);
            if (axios.isAxiosError(err)) {
                setError(`Failed to fetch products: ${err.message}`);
            } else {
                setError("Failed to fetch products");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const updateProduct = async (productId, inStock) => {
        try {
            await axios.put(`${API_BASE_URL}/products/${productId}`, { inStock });
            fetchProducts();
        } catch (err) {
            console.error("Error updating product:", err);
            setError("Failed to update product");
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`${API_BASE_URL}/products/${productId}`);
            fetchProducts();
        } catch (err) {
            console.error("Error deleting product:", err);
            setError("Failed to delete product");
        }
    };

    if (loading) return <div className="loading">Loading products...</div>;

    return (
        <div className="product-list">
            {error && (
                <div className="error-banner">
                    {error}
                    <button onClick={fetchProducts} className="btn btn-retry">Retry</button>
                </div>
            )}
            <h2>Products ({products.length})</h2>
            {products.length === 0 ? (
                <p className="no-products">No products found. Add your first product!</p>
            ) : (
                <div className="products">
                    {products.map((product) => (
                        <div key={product._id} className={`product-card ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                            <div className="product-content">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <div className="product-details">
                                    <span className="price">${product.price}</span>
                                    <span className="category">{product.category}</span>
                                    <span className={`stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                                <small>Added: {new Date(product.createdAt).toLocaleDateString()}</small>
                            </div>
                            <div className="product-actions">
                                <button
                                    onClick={() => updateProduct(product._id, !product.inStock)}
                                    className={`btn ${product.inStock ? 'btn-warning' : 'btn-success'}`}
                                >
                                    {product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                                </button>
                                <button
                                    onClick={() => deleteProduct(product._id)}
                                    className="btn btn-danger"
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
