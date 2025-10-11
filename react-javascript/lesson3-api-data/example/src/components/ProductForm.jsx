import { useState } from "react";
import axios from "axios";

// API base URL for real server
const API_BASE_URL = "/api";

const ProductForm = ({ onProductCreated }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        category: "electronics",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.description.trim() || formData.price <= 0) {
            setError("Please fill in all fields with valid values.");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            console.log('Creating product with data:', formData);

            const response = await axios.post(`${API_BASE_URL}/products`, formData);
            console.log('Product created successfully:', response.data);

            setFormData({ name: "", description: "", price: 0, category: "electronics" });
            onProductCreated();
        } catch (err) {
            console.error("Error creating product:", err);
            let errorMessage = "Failed to create product";

            if (axios.isAxiosError && axios.isAxiosError(err)) {
                if (err.code === 'ECONNREFUSED' || err.message.includes('ECONNREFUSED')) {
                    errorMessage = "Cannot connect to server. Please make sure the backend server is running on port 3001.";
                } else if (err.response?.status === 404) {
                    errorMessage = "API endpoint not found. Please check the server configuration.";
                } else if (err.response?.status >= 500) {
                    errorMessage = "Server error. Please try again later.";
                } else if (err.message.includes('Network Error')) {
                    errorMessage = "Network error. Please check your connection and server status.";
                } else {
                    errorMessage = `Create failed: ${err.message}`;
                }
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
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
                    placeholder="Enter product name..."
                    required
                    maxLength={100}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description..."
                    required
                    maxLength={500}
                    rows={4}
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
                    placeholder="0.00"
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

            <div className="form-actions">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !formData.name.trim() || !formData.description.trim() || formData.price <= 0}
                >
                    {loading ? "Creating..." : "Create Product"}
                </button>

                <button type="button" className="btn btn-secondary" onClick={onProductCreated}>
                    Cancel
                </button>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
        </form>
    );
};

export default ProductForm;
