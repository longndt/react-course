# Exercise 2 Solution: Higher-Order Components (HOC)

Complete solution for the HOC pattern with `withLoading`.

## Files Included

- `LoadingSpinner.jsx` - Loading spinner component
- `LoadingSpinner.css` - Spinner animations
- `withLoading.jsx` - Generic HOC for loading states
- `ProductList.jsx` - Product display component
- `ProductList.css` - Product styling
- `App.jsx` - Complete integration example

## What This Solution Demonstrates

### Higher-Order Component Pattern
An HOC is a function that takes a component and returns a new component with enhanced functionality.

```jsx
function withLoading(Component) {
  return function(props) {
    if (props.isLoading) return <LoadingSpinner />;
    return <Component {...props} />;
  };
}
```

### Loading State Pattern
- Shows spinner while loading
- Displays content when ready
- Clean separation of concerns
- Reusable across components

## How to Use

### 1. Project Structure

```bash
src/
├── components/
│   ├── LoadingSpinner/
│   │   ├── LoadingSpinner.jsx
│   │   └── LoadingSpinner.css
│   ├── ProductList/
│   │   ├── ProductList.jsx
│   │   └── ProductList.css
│   └── hoc/
│       └── withLoading.jsx
└── App.jsx
```

### 2. Apply HOC to Any Component

```jsx
import withLoading from "./hoc/withLoading";
import ProductList from "./components/ProductList/ProductList";

// Wrap component with HOC
const ProductListWithLoading = withLoading(ProductList);

// Use in app
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  return (
    <ProductListWithLoading
      products={data}
      isLoading={isLoading}
    />
  );
}
```

### 3. Simulate Data Loading

```jsx
useEffect(() => {
  setIsLoading(true);
  fetch('/api/products')
    .then(res => res.json())
    .then(data => {
      setProducts(data);
      setIsLoading(false);
    });
}, []);
```

## Key Features

1. **Generic HOC** Works with any component type
2. **Type Safety** Full TypeScript support
3. **Reusable** Apply to multiple components
4. **Clean API** Simple isLoading prop
5. **Professional UI** Animated spinner

## HOC Benefits

### Code Reuse
```jsx
// Apply same loading logic to different components
const UserListWithLoading = withLoading(UserList);
const OrderListWithLoading = withLoading(OrderList);
const ProductListWithLoading = withLoading(ProductList);
```

### Separation of Concerns
- ProductList focuses on displaying products
- withLoading handles loading state
- Each component has single responsibility

### Composability
```jsx
// Combine multiple HOCs
const EnhancedComponent = withLoading(
  withErrorHandling(
    withAnalytics(ProductList)
  )
);
```

## Learning Points

- **HOC Pattern** Function that enhances components

- **Generic Types** TypeScript generics for flexibility

- **Prop Spreading** Passing props to wrapped component

- **CSS Animations** Keyframe animations for spinner

- **Async State** Managing loading states

## Code Highlights

### Generic HOC TypeScript
```jsx
function withLoading<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P & WithLoadingProps> {
  // P = original props
  // P & WithLoadingProps = original + isLoading
}
```

### Prop Extraction
```jsx
const { isLoading, ...rest } = props;
// Extract isLoading, pass rest to component
return <WrappedComponent {...(rest as P)} />;
```

### CSS Spinner Animation
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 0.8s linear infinite;
}
```

## Testing Checklist

- [ ] Spinner shows for 2 seconds on load
- [ ] Products display after loading
- [ ] All 4 products visible
- [ ] Add to Cart buttons work
- [ ] Hover effects on product cards
- [ ] Responsive on mobile
- [ ] No TypeScript errors

## Alternative Patterns

### Modern Alternative: Custom Hook
```jsx
// Instead of HOC, use hook
function useLoading(isLoading) {
  if (isLoading) return <LoadingSpinner />;
  return null;
}

function ProductList({ products, isLoading }) {
  const loader = useLoading(isLoading);
  if (loader) return loader;
  return <div>{/* products */}</div>;
}
```

### When to Use HOC vs Hooks
- **HOC** Cross-cutting concerns, multiple components

- **Hooks** Component-specific logic, state management

## Next Steps

After understanding this solution:
1. Create more HOCs (withErrorHandling, withAuth)
2. Combine multiple HOCs together
3. Convert HOC to custom hook
4. Add error boundaries
5. Implement retry logic

HOCs are still used in popular libraries like:
- React Router (withRouter)
- Redux (connect)
- React DnD (DragSource, DropTarget)
