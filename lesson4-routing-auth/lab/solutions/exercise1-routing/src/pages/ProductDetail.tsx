import { useParams, useNavigate } from 'react-router-dom';

// Same product data as Products.tsx
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    category: 'Electronics',
    image: '🎧',
    description: 'Premium noise-cancelling wireless headphones',
    features: ['Active Noise Cancellation', 'Bluetooth 5.0', '30-hour battery life', 'Premium comfort'],
    inStock: true
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 249.99,
    category: 'Electronics',
    image: '⌚',
    description: 'Fitness tracking and notifications on your wrist',
    features: ['Heart rate monitoring', 'GPS tracking', 'Water resistant', '7-day battery'],
    inStock: true
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 79.99,
    category: 'Accessories',
    image: '🎒',
    description: 'Durable backpack with laptop compartment',
    features: ['Fits 15" laptop', 'Water resistant', 'Multiple pockets', 'Ergonomic design'],
    inStock: true
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 149.99,
    category: 'Electronics',
    image: '⌨',
    description: 'RGB mechanical keyboard for gaming',
    features: ['Cherry MX switches', 'RGB backlight', 'Programmable keys', 'USB passthrough'],
    inStock: false
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    price: 49.99,
    category: 'Electronics',
    image: '🖱',
    description: 'Ergonomic wireless mouse with precision tracking',
    features: ['16000 DPI', 'Wireless 2.4GHz', 'Rechargeable battery', '7 programmable buttons'],
    inStock: true
  },
  {
    id: 6,
    name: 'USB-C Hub',
    price: 39.99,
    category: 'Accessories',
    image: '🔌',
    description: 'Multi-port USB-C hub with HDMI and card reader',
    features: ['4K HDMI output', '100W power delivery', 'SD card reader', 'USB 3.0 ports'],
    inStock: true
  },
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the product by ID
  const product = products.find(p => p.id === Number(id));

  // Handle product not found
  if (!product) {
    return (
      <div className="page-container">
        <div className="error-container">
          <h1>Product Not Found</h1>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <button onClick={() => navigate(-1)} className="btn-back">
        ← Back
      </button>

      <div className="product-detail">
        <div className="product-detail-image">
          <span className="product-emoji">{product.image}</span>
        </div>

        <div className="product-detail-info">
          <span className="product-badge">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-price-section">
            <span className="product-detail-price">${product.price}</span>
            <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </span>
          </div>

          <div className="product-features">
            <h3>Key Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          <div className="product-actions">
            <button
              className="btn-primary btn-large"
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              className="btn-secondary btn-large"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
