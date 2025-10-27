# Lab 4 - Exercise 1: Basic Routing Solution

## 📋 Overview

Complete solution demonstrating **React Router v6** with basic routing, navigation, route parameters, and programmatic navigation.

This solution showcases:
- BrowserRouter setup
- Multiple routes configuration
- Navigation with Link and NavLink components
- Active link highlighting
- Route parameters with useParams hook
- Programmatic navigation with useNavigate hook
- 404 Not Found page
- Professional UI with responsive design

---

## Project Structure

```
exercise1-routing/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation bar with NavLink
│   │   └── Navbar.css           # Navbar styling
│   ├── pages/
│   │   ├── Home.tsx             # Home page with hero section
│   │   ├── About.tsx            # About page
│   │   ├── Contact.tsx          # Contact page with form
│   │   ├── Products.tsx         # Products list page
│   │   ├── ProductDetail.tsx    # Product detail with params
│   │   └── NotFound.tsx         # 404 error page
│   ├── App.tsx                  # Router configuration
│   ├── App.css                  # Application styles
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── package.json                 # Dependencies
└── readme.md                    # This file
```

---

## Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
```

This installs:
- `react` & `react-dom` - React library
- `react-router-dom` - React Router for navigation
- `typescript` & `vite` - Build tools

### Step 2: Start Development Server

```bash
npm run dev
```

App will start at: `http://localhost:5173`

---

## Key Concepts Explained

### 1. BrowserRouter Setup

**App.tsx** - Wrapping the application with BrowserRouter:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
```

**Key Points:**
- `BrowserRouter` provides routing context for the entire app
- `Routes` component wraps all `Route` components
- `Route` defines path and component mapping
- `path="*"` catches all unmatched routes (404 page)
- Navbar is outside Routes, so it appears on all pages

---

### 2. Navigation with Link and NavLink

**Link Component** - Basic navigation without active state:

```tsx
import { Link } from 'react-router-dom';

<Link to="/" className="logo">
  MyApp
</Link>
```

**NavLink Component** - Navigation with active state tracking:

```tsx
import { NavLink } from 'react-router-dom';

<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
>
  About
</NavLink>
```

**Benefits of NavLink:**
- Automatically applies `active` class when the route matches
- `isActive` prop in className function
- Use `end` prop to match only exact paths

**Example with `end` prop:**

```tsx
<NavLink
  to="/"
  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
  end  // Only active on exact "/" match, not "/products"
>
  Home
</NavLink>
```

---

### 3. Route Parameters with useParams

**Dynamic Routes** - Define route with parameter:

```tsx
// In App.tsx
<Route path="/products/:id" element={<ProductDetail />} />
```

**Extract Parameter** - Use `useParams` hook:

```tsx
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  // Use id to find the product
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return <div>{product.name}</div>;
}
```

**Multiple Parameters** - You can have multiple params:

```tsx
// Route definition
<Route path="/categories/:category/products/:id" element={<ProductDetail />} />

// Extract params
const { category, id } = useParams<{ category: string; id: string }>();
```

---

### 4. Programmatic Navigation with useNavigate

**useNavigate Hook** - Navigate programmatically in code:

```tsx
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
  const navigate = useNavigate();

  // Navigate to specific route
  const goToProducts = () => {
    navigate('/products');
  };

  // Navigate back in history
  const goBack = () => {
    navigate(-1);  // Go back 1 page
  };

  // Navigate forward
  const goForward = () => {
    navigate(1);  // Go forward 1 page
  };

  return (
    <div>
      <button onClick={goBack}>← Back</button>
      <button onClick={goToProducts}>All Products</button>
    </div>
  );
}
```

**Navigation Options:**

```tsx
// Navigate with state
navigate('/dashboard', { state: { from: 'login' } });

// Replace current history entry (can't go back)
navigate('/dashboard', { replace: true });

// Navigate with query parameters
navigate('/search?q=react');
```

---

### 5. Linking to Dynamic Routes

**Products Page** - Create links to dynamic routes:

```tsx
const products = [
  { id: 1, name: 'Product 1', price: 99.99 },
  { id: 2, name: 'Product 2', price: 149.99 },
  { id: 3, name: 'Product 3', price: 199.99 },
];

function Products() {
  return (
    <div>
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/products/${product.id}`}  // Dynamic URL
        >
          {product.name}
        </Link>
      ))}
    </div>
  );
}
```

**Generated URLs:**
- `/products/1` → Product 1 detail
- `/products/2` → Product 2 detail
- `/products/3` → Product 3 detail

---

## Features Implemented

### Page Components

1. **Home** - Hero section with feature cards
2. **About** - Information about the application
3. **Contact** - Contact information and form
4. **Products** - Grid of product cards
5. **ProductDetail** - Detailed product view with parameters
6. **NotFound** - 404 error page for invalid routes

### Navigation Features

- [x] Navbar component with Logo
- [x] Navigation links (Home, Products, About, Contact)
- [x] Active link highlighting with NavLink
- [x] Logo link to home page
- [x] Sticky navbar positioning
- [x] Responsive navigation

### Routing Features

- [x] BrowserRouter configuration
- [x] Multiple static routes (/, /about, /contact, /products)
- [x] Dynamic route with parameter (/products/:id)
- [x] Catch-all route for 404 (*)
- [x] Product detail page with useParams
- [x] Back button with useNavigate(-1)
- [x] Navigation buttons with useNavigate

### UI/UX Enhancements

- [x] Gradient backgrounds and modern design
- [x] Hover effects on cards and buttons
- [x] Page transition animations
- [x] Responsive grid layouts
- [x] Professional color scheme
- [x] Loading states and error handling
- [x] Stock badges (in stock / out of stock)

---

## Routing Patterns Demonstrated

### Pattern 1: Basic Static Routes

```tsx
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
```

### Pattern 2: Dynamic Routes

```tsx
<Route path="/products/:id" element={<ProductDetail />} />
```

### Pattern 3: Catch-All Route

```tsx
<Route path="*" element={<NotFound />} />
```

### Pattern 4: Nested Routes (Bonus)

```tsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route path="stats" element={<Stats />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

---

## 🐛 Troubleshooting

### Issue: Links don't work / page reloads

**Cause:** Using `<a>` tags instead of `<Link>` components **Solution:**
```tsx
//  Wrong - causes full page reload
<a href="/about">About</a>

//  Correct - client-side navigation
<Link to="/about">About</Link>
```

---

### Issue: Active class not applying

**Cause:** Using `Link` instead of `NavLink`

**Solution:**
```tsx
//  Wrong - no active state
<Link to="/about" className="nav-link">About</Link>

//  Correct - provides isActive prop
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
>
  About
</NavLink>
```

---

### Issue: Home link always active

**Cause:** Path "/" matches all routes starting with "/"

**Solution:** Add `end` prop to Home NavLink:
```tsx
<NavLink to="/" end className={...}>Home</NavLink>
```

---

### Issue: useParams returns undefined

**Cause:** Using wrong parameter name or component not in route **Solution:**
```tsx
// Route definition
<Route path="/products/:id" element={<ProductDetail />} />

// Extract - name must match route
const { id } = useParams();  //  Correct
const { productId } = useParams();  //  Wrong - mismatch
```

---

## React Router v6 Hooks Summary

| Hook | Purpose | Return Value |
|------|---------|--------------|
| `useParams` | Get URL parameters | `{ [key: string]: string }` |
| `useNavigate` | Programmatic navigation | `(to: string \| number, options?) => void` |
| `useLocation` | Current location object | `{ pathname, search, hash, state }` |
| `useSearchParams` | Get/set query parameters | `[searchParams, setSearchParams]` |
| `useMatch` | Match against a path | `Match \| null` |

---

## Learning Objectives Achieved

After reviewing this solution, you should understand:

**Routing Setup**
- How to configure BrowserRouter
- How to define routes with `<Route>`
- How to organize routes in Routes component
- How to create catch-all 404 routes **Navigation**
- Difference between Link and NavLink
- How to create clickable navigation
- How to highlight active links
- How to navigate with buttons **Dynamic Routing**
- How to define route parameters
- How to extract params with useParams
- How to create dynamic page content
- How to handle missing data (404)

**Programmatic Navigation**
- How to use useNavigate hook
- How to navigate to specific routes
- How to go back in history
- How to pass state during navigation

---

## Next Steps

### Completed in This Exercise
- Basic routing with multiple pages
- Navigation bar with active links
- Dynamic routes with parameters
- Programmatic navigation

### Next Exercise (Exercise 2)
- ⏭ Authentication Context
- ⏭ Protected Routes
- ⏭ Login/Logout functionality
- ⏭ Session persistence with localStorage

### Bonus Challenges (Try These!)

1. **Search Functionality**
   - Add search input to Products page
   - Filter products by name
   - Use query parameters: `/products?search=laptop`

2. **Pagination**
   - Show 3 products per page
   - Add pagination buttons
   - Use query params: `/products?page=2`

3. **Breadcrumbs**
   - Show navigation trail (Home > Products > Product Name)
   - Auto-generate from current route

4. **Category Filter**
   - Add category route: `/products/category/:category`
   - Filter products by category (Electronics, Accessories)

---

## 📖 Additional Resources

### Official Documentation
- [React Router Documentation](https://reactrouter.com/en/main)
- [React Router v6 Tutorial](https://reactrouter.com/en/main/start/tutorial)

### Video Tutorials
- [React Router in 100 Seconds](https://www.youtube.com/watch?v=Ul3y1LXxzdU)
- [React Router v6 Complete Guide](https://www.youtube.com/watch?v=oTIJunBa6MA)

### Advanced Topics
- [Nested Routes & Layouts](https://reactrouter.com/en/main/start/tutorial#nested-routes)
- [Data Loading with Loaders](https://reactrouter.com/en/main/route/loader)
- [Form Actions](https://reactrouter.com/en/main/route/action)

---

**Exercise 1 Complete!** You've mastered React Router basics. Move on to Exercise 2 to learn authentication and protected routes!
