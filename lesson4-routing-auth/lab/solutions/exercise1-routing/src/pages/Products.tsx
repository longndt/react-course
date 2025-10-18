import { Link } from 'react-router-dom';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    category: 'Electronics',
    image: '🎧',
    description: 'Premium noise-cancelling wireless headphones'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 249.99,
    category: 'Electronics',
    image: '⌚',
    description: 'Fitness tracking and notifications on your wrist'
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 79.99,
    category: 'Accessories',
    image: '🎒',
    description: 'Durable backpack with laptop compartment'
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 149.99,
    category: 'Electronics',
    image: '⌨',
    description: 'RGB mechanical keyboard for gaming'
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    price: 49.99,
    category: 'Electronics',
    image: '🖱',
    description: 'Ergonomic wireless mouse with precision tracking'
  },
  {
    id: 6,
    name: 'USB-C Hub',
    price: 39.99,
    category: 'Accessories',
    image: '🔌',
    description: 'Multi-port USB-C hub with HDMI and card reader'
  },
];

export default function Products() {
  return (
    <div className="page-container">
      <h1>Our Products</h1>
      <p className="page-description">
        Browse our collection of premium tech products. Click on any product to see details.
      </p>

      <div className="products-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="product-card"
          >
            <div className="product-image">{product.image}</div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
            </div>
            <button className="btn-view">View Details →</button>
          </Link>
        ))}
      </div>
    </div>
  );
}
