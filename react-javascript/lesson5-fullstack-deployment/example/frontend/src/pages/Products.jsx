import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './Products.css';

/**
 * @typedef {Object} Product
 * @property {string} _id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} category
 * @property {number} stock
 * @property {string} image
 * @property {string} createdAt
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Products = () => {
    const { logout } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('desc');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Electronics',
        stock: '',
        image: null
    });

    const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys', 'Other'];

    useEffect(() => {
        fetchProducts();
    }, [search, category, sortBy, order]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const params = new URLSearchParams({
                search,
                category,
                sortBy,
                order,
                limit: '50'
            });

            const response = await fetch(`${API_URL}/api/products?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch products');

            const data = await response.json();
            console.log('Fetched products:', data.data.products);
            setProducts(data.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Please log in to add products');
                return;
            }

            const formDataToSend = new FormData();

            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('stock', formData.stock);

            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            const url = editingProduct
                ? `${API_URL}/api/products/${editingProduct._id}`
                : `${API_URL}/api/products`;

            console.log('Sending request to:', url);
            console.log('Form data:', Object.fromEntries(formDataToSend.entries()));

            const response = await fetch(url, {
                method: editingProduct ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Failed to save product');
            }

            setShowModal(false);
            setEditingProduct(null);
            resetForm();
            fetchProducts();
            alert('Product saved successfully!');
        } catch (error) {
            console.error('Error saving product:', error);
            alert(error.message || 'Failed to save product');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete product');

            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            stock: product.stock.toString(),
            image: null
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: 'Electronics',
            stock: '',
            image: null
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    return (
        <div className="products-page">
            <div className="products-container">
                {/* Header */}
                <div className="products-header">
                    <div>
                        <h1>Products</h1>
                        <p>Manage your product inventory</p>
                    </div>
                    <div className="header-actions">
                        <Link to="/dashboard" className="btn btn-secondary">
                            ← Back to Dashboard
                        </Link>
                        <button onClick={logout} className="btn btn-secondary">
                            Logout
                        </button>
                    </div>
                </div>

                {/* Filters & Actions */}
                <div className="filters-bar">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="filter-select"
                    >
                        <option value="createdAt">Date</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="stock">Stock</option>
                    </select>

                    <button
                        onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                        className="btn btn-secondary"
                    >
                        {order === 'asc' ? '↑' : '↓'}
                    </button>

                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            resetForm();
                            setShowModal(true);
                        }}
                        className="btn btn-primary"
                    >
                        + Add Product
                    </button>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <LoadingSpinner fullScreen />
                ) : products.length === 0 ? (
                    <div className="empty-state">
                        <p>No products found. Create your first product!</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map(product => (
                            <div key={product._id} className="product-card">
                                <div className="product-image">
                                    {product.image ? (
                                        <img 
                                            src={(() => {
                                                // Ensure proper URL format
                                                const imagePath = product.image.startsWith('/') ? product.image : `/${product.image}`;
                                                const apiUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
                                                const imageUrl = `${apiUrl}${imagePath}`;
                                                console.log('Image URL:', {
                                                    productId: product._id,
                                                    productName: product.name,
                                                    imagePath: product.image,
                                                    finalUrl: imageUrl
                                                });
                                                return imageUrl;
                                            })()}
                                            alt={product.name}
                                            onError={(e) => {
                                                console.error('Image load error:', {
                                                    src: e.target.src,
                                                    productId: product._id,
                                                    productName: product.name,
                                                    imagePath: product.image,
                                                    apiUrl: API_URL
                                                });
                                                e.target.style.display = 'none';
                                                if (e.target.parentElement && !e.target.parentElement.querySelector('.no-image')) {
                                                    const fallback = document.createElement('div');
                                                    fallback.className = 'no-image';
                                                    fallback.textContent = 'Image not found';
                                                    e.target.parentElement.appendChild(fallback);
                                                }
                                            }}
                                            onLoad={(e) => {
                                                console.log('Image loaded successfully:', {
                                                    src: e.target.src,
                                                    productId: product._id
                                                });
                                            }}
                                        />
                                    ) : (
                                        <div className="no-image">No Image</div>
                                    )}
                                </div>
                                <div className="product-content">
                                    <h3>{product.name}</h3>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-meta">
                                        <span className="product-price">${product.price.toFixed(2)}</span>
                                        <span className={`product-stock ${product.stock <= 10 ? 'low' : ''}`}>
                                            Stock: {product.stock}
                                        </span>
                                    </div>
                                    <span className="product-category">{product.category}</span>
                                </div>
                                <div className="product-actions">
                                    <button onClick={() => handleEdit(product)} className="btn-edit">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(product._id)} className="btn-delete">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                                <button onClick={() => setShowModal(false)} className="modal-close">
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="product-form">
                                <div className="form-group">
                                    <label>Product Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter product name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Description *</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Enter product description"
                                        rows={3}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Price *</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Stock *</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Category *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Product Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="file-input"
                                    />
                                    {editingProduct && editingProduct.image && !formData.image && (
                                        <p className="form-hint">Current image will be kept if no new image is uploaded</p>
                                    )}
                                </div>

                                <div className="modal-actions">
                                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {editingProduct ? 'Update Product' : 'Create Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;

