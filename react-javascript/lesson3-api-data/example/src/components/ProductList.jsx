import { useState, useEffect } from "react";

// Mock data for demo
const mockProducts = [
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

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching products from mock data');

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Use mock data instead of API call
            setProducts(mockProducts);
            console.log('Products fetched successfully:', mockProducts);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const updateProduct = async (productId, inStock) => {
        try {
            console.log('Updating product:', productId, 'inStock:', inStock);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Update local state
            setProducts(prev => prev.map(product =>
                product._id === productId
                    ? { ...product, inStock }
                    : product
            ));
        } catch (err) {
            console.error("Error updating product:", err);
            setError("Failed to update product");
        }
    };

    const deleteProduct = async (productId) => {
        try {
            console.log('Deleting product:', productId);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Update local state
            setProducts(prev => prev.filter(product => product._id !== productId));
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
