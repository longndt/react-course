# Quick Start - Lesson 1: React Setup & First Components

> **Copy-paste ready code examples for rapid development**

---

## Part 1: Project Setup

### Create New React + TypeScript Project

```bash
# Create new project with TypeScript template
npm create vite@latest my-first-react-app -- --template react-ts

# Navigate to project
cd my-first-react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Verify Installation

```bash
# Check versions
node --version    # Should be v18.0.0+
npm --version     # Should be v9.0.0+

# Project should open at http://localhost:5173
```

### Optional: Install Useful Libraries

```bash
# Icon library
npm install lucide-react

# Utility for conditional classes
npm install clsx

# Date utilities
npm install date-fns
```

---

## Part 2: Basic Components

### 1. Simple Greeting Component

```tsx
// src/components/Greeting.tsx
interface GreetingProps {
  name: string;
}

function Greeting({ name }: GreetingProps) {
  return (
    <div className="greeting">
      <h1>Hello, {name}!</h1>
      <p>Welcome to React with TypeScript</p>
    </div>
  );
}

export default Greeting;
```

**Usage:**
```tsx
import Greeting from './components/Greeting';

function App() {
  return <Greeting name="John" />;
}
```

### 2. Button Component

```tsx
// src/components/Button.tsx
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

function Button({ text, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
```

**Styles:**
```css
/* src/components/Button.css */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}
```

**Usage:**
```tsx
<Button text="Click Me" onClick={() => alert('Clicked!')} />
<Button text="Cancel" onClick={() => {}} variant="secondary" />
<Button text="Delete" onClick={() => {}} variant="danger" />
```

### 3. Card Component

```tsx
// src/components/Card.tsx
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

function Card({ title, children, footer }: CardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;
```

**Styles:**
```css
/* src/components/Card.css */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #dee2e6;
}

.card-header h3 {
  margin: 0;
  color: #333;
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  border-top: 1px solid #dee2e6;
}
```

**Usage:**
```tsx
<Card
  title="User Profile"
  footer={<Button text="Edit Profile" onClick={() => {}} />}
>
  <p>Name: John Doe</p>
  <p>Email: john@example.com</p>
</Card>
```

---

## Part 3: Components with Props

### 1. User Profile Card

```tsx
// src/components/UserProfile.tsx
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface UserProfileProps {
  user: User;
}

function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} className="user-avatar" />
      <div className="user-info">
        <h2>{user.name}</h2>
        <p className="user-email">{user.email}</p>
        <span className="user-role">{user.role}</span>
      </div>
    </div>
  );
}

export default UserProfile;
```

**Styles:**
```css
/* src/components/UserProfile.css */
.user-profile {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-info h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.user-email {
  color: #666;
  margin: 0 0 0.5rem 0;
}

.user-role {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 4px;
  font-size: 0.875rem;
}
```

**Usage:**
```tsx
const user = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://i.pravatar.cc/150?img=1",
  role: "Developer"
};

<UserProfile user={user} />
```

### 2. Product Card

```tsx
// src/components/ProductCard.tsx
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        {product.inStock ? (
          <button
            className="btn-add-cart"
            onClick={() => onAddToCart(product.id)}
          >
            Add to Cart
          </button>
        ) : (
          <p className="out-of-stock">Out of Stock</p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
```

**Styles:**
```css
/* src/components/ProductCard.css */
.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}

.product-info h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #28a745;
  margin: 0.5rem 0;
}

.btn-add-cart {
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s ease;
}

.btn-add-cart:hover {
  background: #0056b3;
}

.out-of-stock {
  color: #dc3545;
  font-weight: bold;
  text-align: center;
  margin: 0;
}
```

**Usage:**
```tsx
const products = [
  { id: 1, name: "Laptop", price: 999.99, image: "/laptop.jpg", inStock: true },
  { id: 2, name: "Mouse", price: 29.99, image: "/mouse.jpg", inStock: false }
];

{products.map(product => (
  <ProductCard
    key={product.id}
    product={product}
    onAddToCart={(id) => console.log(`Added product ${id}`)}
  />
))}
```

---

## Part 4: List Components

### 1. Simple List Component

```tsx
// src/components/ItemList.tsx
interface Item {
  id: number;
  text: string;
}

interface ItemListProps {
  items: Item[];
}

function ItemList({ items }: ItemListProps) {
  return (
    <ul className="item-list">
      {items.map(item => (
        <li key={item.id} className="item">
          {item.text}
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
```

**Styles:**
```css
/* src/components/ItemList.css */
.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  transition: background 0.2s ease;
}

.item:hover {
  background: #f5f5f5;
}

.item:last-child {
  border-bottom: none;
}
```

### 2. User List Component

```tsx
// src/components/UserList.tsx
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
}

function UserList({ users, onUserClick }: UserListProps) {
  return (
    <div className="user-list">
      {users.map(user => (
        <div
          key={user.id}
          className="user-list-item"
          onClick={() => onUserClick(user)}
        >
          <img src={user.avatar} alt={user.name} className="user-list-avatar" />
          <div className="user-list-info">
            <h4>{user.name}</h4>
            <p>{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
```

**Styles:**
```css
/* src/components/UserList.css */
.user-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.user-list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-list-item:hover {
  background: #f8f9fa;
  transform: translateX(4px);
}

.user-list-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.user-list-info h4 {
  margin: 0 0 0.25rem 0;
  color: #333;
}

.user-list-info p {
  margin: 0;
  color: #666;
  font-size: 0.875rem;
}
```

---

## Part 5: Layout Components

### 1. Header Component

```tsx
// src/components/Header.tsx
interface HeaderProps {
  title: string;
  subtitle?: string;
}

function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="header">
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </header>
  );
}

export default Header;
```

**Styles:**
```css
/* src/components/Header.css */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 1.125rem;
}
```

### 2. Container Component

```tsx
// src/components/Container.tsx
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

function Container({ children, maxWidth = 'lg' }: ContainerProps) {
  return (
    <div className={`container container-${maxWidth}`}>
      {children}
    </div>
  );
}

export default Container;
```

**Styles:**
```css
/* src/components/Container.css */
.container {
  margin: 0 auto;
  padding: 0 1rem;
}

.container-sm {
  max-width: 640px;
}

.container-md {
  max-width: 768px;
}

.container-lg {
  max-width: 1024px;
}

.container-xl {
  max-width: 1280px;
}
```

### 3. Grid Layout Component

```tsx
// src/components/Grid.tsx
import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

function Grid({ children, columns = 3, gap = 'md' }: GridProps) {
  return (
    <div className={`grid grid-cols-${columns} grid-gap-${gap}`}>
      {children}
    </div>
  );
}

export default Grid;
```

**Styles:**
```css
/* src/components/Grid.css */
.grid {
  display: grid;
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

.grid-gap-sm { gap: 0.5rem; }
.grid-gap-md { gap: 1rem; }
.grid-gap-lg { gap: 2rem; }

@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: 1fr;
  }
}
```

---

## Part 6: Complete Example App

### Full Application Example

```tsx
// src/App.tsx
import { useState } from 'react';
import Header from './components/Header';
import Container from './components/Container';
import Grid from './components/Grid';
import ProductCard from './components/ProductCard';
import UserProfile from './components/UserProfile';
import Button from './components/Button';
import './App.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

function App() {
  const [cart, setCart] = useState<number[]>([]);

  const currentUser: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "Developer"
  };

  const products: Product[] = [
    {
      id: 1,
      name: "Laptop Pro",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      inStock: true
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
      inStock: true
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
      inStock: false
    },
    {
      id: 4,
      name: "HD Webcam",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
      inStock: true
    }
  ];

  const handleAddToCart = (productId: number) => {
    setCart([...cart, productId]);
    alert(`Added product ${productId} to cart!`);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="app">
      <Header
        title="Welcome to Our Store"
        subtitle="Find amazing products at great prices"
      />

      <Container maxWidth="xl">
        <div className="user-section">
          <UserProfile user={currentUser} />
          <div className="cart-info">
            <p>Items in cart: {cart.length}</p>
            {cart.length > 0 && (
              <Button
                text="Clear Cart"
                onClick={handleClearCart}
                variant="danger"
              />
            )}
          </div>
        </div>

        <div className="products-section">
          <h2>Featured Products</h2>
          <Grid columns={4} gap="lg">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default App;
```

### App Styles

```css
/* src/App.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #f5f5f5;
}

.app {
  min-height: 100vh;
}

.user-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-info {
  text-align: right;
}

.cart-info p {
  margin-bottom: 1rem;
  font-size: 1.125rem;
  color: #333;
}

.products-section {
  margin: 2rem 0;
}

.products-section h2 {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 2rem;
}

@media (max-width: 768px) {
  .user-section {
    flex-direction: column;
    gap: 1rem;
  }

  .cart-info {
    text-align: center;
    width: 100%;
  }
}
```

---

## Part 7: Common Patterns

### Conditional Rendering

```tsx
function StatusMessage({ status }: { status: 'loading' | 'success' | 'error' }) {
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p className="error">An error occurred</p>;
  }

  return <p className="success">Success!</p>;
}

// Or using ternary
function ToggleButton({ isOn }: { isOn: boolean }) {
  return (
    <button className={isOn ? 'btn-on' : 'btn-off'}>
      {isOn ? 'Turn Off' : 'Turn On'}
    </button>
  );
}

// Or using &&
function WelcomeMessage({ user }: { user?: { name: string } }) {
  return (
    <div>
      {user && <h2>Welcome back, {user.name}!</h2>}
    </div>
  );
}
```

### Event Handling

```tsx
function EventExamples() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted!');
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <input type="text" onChange={handleInputChange} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

### Styling Patterns

```tsx
// Inline styles
<div style={{ color: 'red', fontSize: '20px' }}>Text</div>

// CSS modules (Button.module.css)
import styles from './Button.module.css';
<button className={styles.button}>Click</button>

// Conditional classes with clsx
import clsx from 'clsx';
<button className={clsx('btn', { 'btn-active': isActive })}>Click</button>

// Multiple classes
<div className="card shadow rounded">Content</div>
```

---

## Part 8: TypeScript Tips

### Interface vs Type

```tsx
// Interface (preferred for objects)
interface User {
  id: number;
  name: string;
  email: string;
}

// Type (for unions, primitives, etc.)
type Status = 'idle' | 'loading' | 'success' | 'error';
type ID = string | number;
```

### Optional Properties

```tsx
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;  // Optional
  variant?: 'primary' | 'secondary';
}

// With default values
function Button({ text, onClick, disabled = false, variant = 'primary' }: ButtonProps) {
  // ...
}
```

### Children Prop

```tsx
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

### Event Types

```tsx
// Click event
onClick: (e: React.MouseEvent<HTMLButtonElement>) => void

// Change event
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

// Submit event
onSubmit: (e: React.FormEvent<HTMLFormElement>) => void

// Generic event
onKeyPress: (e: React.KeyboardEvent) => void
```

---

## Troubleshooting

### Common Errors

**"Cannot find module"**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**"Port already in use"**
```bash
# Windows
npx kill-port 5173

# Mac/Linux
lsof -ti:5173 | xargs kill
```

**TypeScript errors**
- Check interface definitions match usage
- Ensure all imports are correct
- Restart VS Code: Cmd/Ctrl + Shift + P → "Reload Window"

**Styling not applying**
- Verify CSS file is imported
- Check className spelling
- Clear browser cache: Cmd/Ctrl + Shift + R

---

## Next Steps

✅ **You now have:**
- Complete component library
- TypeScript patterns
- Styling examples
- Real-world app structure

**Continue learning:**
- [Lab 1](../lab/lab1.md) - Build complete projects
- [Theory 1](../theory/theory1.md) - Deep dive into concepts
- [Lesson 2](../../lesson2-component-hook/) - Advanced patterns and hooks
