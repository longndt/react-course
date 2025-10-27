# Lab 2 - Component Architecture & React Hook

## 📋 Overview

In this lab, you'll build a complete product showcase application using advanced React patterns. You'll implement reusable component systems, custom hooks, context for state management, and modern architectural patterns that professional developers use in production applications.

## Learning Objectives

By completing this lab, you will be able to:
- Build compound components using composition patterns
- Create and use Higher-Order Components (HOCs) for cross-cutting concerns
- Implement custom hooks to encapsulate reusable logic
- Use Context API for global state management
- Apply PropTypes for type-safe component development
- Structure a scalable React application architecture

## Pre-Lab Checklist

- [ ] Lab 1 completed successfully (understand components, props, JSX)
- [ ] Node.js v18+ and npm installed
- [ ] VS Code with React extensions
- [ ] Basic understanding of PropTypes
- [ ] Familiarity with React hooks (`useState`, `useEffect`) from theory

---

## Exercise 1: Component Composition with Card System (Guided - 40% Practice)

### Concept Review

**Compound Components** allow you to create flexible, composable UIs where parent and child components work together. Instead of passing many props, you compose components using `children`. This pattern is used by libraries like React Router (`<Routes><Route /></Routes>`) and Material-UI.

**Example of Compound Pattern:**
```jsx
// Instead of this (prop drilling):
<Card title="Product" body="Description" footer="$99" />

// Use composition:
<Card>
  <Card.Header>Product</Card.Header>
  <Card.Body>Description</Card.Body>
  <Card.Footer>$99</Card.Footer>
</Card>
```

### Goals

- Understand compound component pattern
- Create flexible Card system with subcomponents
- Use PropTypes for props validation
- Apply composition over configuration

### Step 1: Project Setup (Guided)

Create a new Vite + React project:

```bash
npm create vite@latest lab2-advanced-components -- --template react
cd lab2-advanced-components
npm install prop-types
npm run dev
```

Create folder structure:
```bash
mkdir src/components
mkdir src/components/Card
mkdir src/hooks
mkdir src/context
mkdir src/hoc
mkdir src/types
```

### Step 2: Create Basic Card Component (Guided)

Create `src/components/Card/Card.jsx`:

```jsx
import PropTypes from 'prop-types';
import './Card.css';

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

// Compound components - attached to Card
Card.Header = function CardHeader({ children }) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
};

Card.Footer = function CardFooter({ children }: CardSubComponentProps) {
  return <div className="card-footer">{children}</div>;
};

export default Card;
```

**Key Concepts Explained:**
- `ReactNode` type accepts any valid React children
- `className?` means optional prop
- `Card.Header` attaches subcomponent to main Card function
- Each subcomponent has its own styling class

### Step 3: Style the Card (Your Turn - 60% Practice)

**🔨 TODO: Create Card Styling**

Create `src/components/Card/Card.css`:

**Requirements:**
1. Style `.card` class with:
   - Background: white
   - Border radius: 16px
   - Box shadow: `0 8px 25px rgba(0, 0, 0, 0.08)`
   - Overflow: hidden
   - Transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

2. Add hover effect `.card:hover`:
   - Transform: `translateY(-8px)`
   - Box shadow: `0 20px 40px rgba(0, 0, 0, 0.12)`

3. Style `.card-header`:
   - Padding: 1.5rem
   - Background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
   - Color: white

4. Style `.card-body`:
   - Padding: 2rem 1.5rem
   - Line height: 1.6

5. Style `.card-footer`:
   - Padding: 1.5rem
   - Background: #f8f9fa
   - Border top: 1px solid #e9ecef **Hints:**
- Use `cubic-bezier` for smooth animations
- Gradients use `linear-gradient(angle, color1, color2)`
- Transform creates lift effect on hover
- Overflow hidden keeps corners rounded

**Expected Outcome:**
- Card has rounded corners and shadow
- Smooth lift animation on hover
- Purple gradient header
- Light gray footer
- Clean, professional appearance

**Solution:** See `solutions/exercise1-card-system/Card.css`

### Step 4: Use Card in App (Your Turn)

**🔨 TODO: Create Product Card Display**

Update `src/App.jsx`:

**Requirements:**
1. Import Card component
2. Create a product card with:
   - `Card.Header`: Product name "Premium Headphones"
   - `Card.Body`: Description and price ($99.99)
   - `Card.Footer`: A button "Add to Cart"
3. Import and apply `App.css`
4. Wrap everything in a container div

**Hints:**
- Use `<Card>` as wrapper
- Place each section inside: `<Card.Header>`, `<Card.Body>`, `<Card.Footer>`
- Add className for styling if needed

**Expected Outcome:**
- Product card displays with all sections
- Hover effect works
- Professional gradient header
- Button visible in footer

### Testing

1. Run `npm run dev`
2. Check browser - should see product card
3. Hover over card - should lift up with shadow
4. All three sections (header, body, footer) should be visible
5. No console errors

**Solution:** See `solutions/exercise1-card-system/`

---

---

## Exercise 2: Higher-Order Components (Your Turn - 70% Practice)

### Concept Review

**Higher-Order Components (HOCs)** are functions that take a component and return a new enhanced component. They're used for cross-cutting concerns like loading states, authentication, or logging.

**HOC Pattern:**
```jsx
function withFeature(WrappedComponent) {
  return function EnhancedComponent(props) {
    // Add feature logic here
    return <WrappedComponent {...props} />;
  };
}

// Usage:
const EnhancedComponent = withFeature(MyComponent);
```

### Goals

- Create a `withLoading` HOC
- Build a LoadingSpinner component
- Apply HOC to a ProductList
- Understand TypeScript generics with HOCs

### Task 1: Create LoadingSpinner Component (Your Turn)

**🔨 TODO: Build a Reusable Loading Spinner**

Create `src/components/LoadingSpinner/LoadingSpinner.jsx`:

**Requirements:**
1. Create a functional component named `LoadingSpinner`
2. Return a `div` with className "spinner"
3. Inside, add another `div` with className "spinner-inner"
4. Export as default

Create `src/components/LoadingSpinner/LoadingSpinner.css`:

**Requirements for CSS:**
1. `.spinner` class:
   - Display: flex
   - Justify content: center
   - Align items: center
   - Padding: 3rem

2. `.spinner-inner` class:
   - Width: 50px, Height: 50px
   - Border: 4px solid #f3f3f3
   - Border-top: 4px solid #667eea
   - Border radius: 50%
   - Animation: `spin 1s linear infinite`

3. Define `@keyframes spin`:
   - From: `transform: rotate(0deg)`
   - To: `transform: rotate(360deg)`

**Hints:**
- Use flexbox to center the spinner
- `border-radius: 50%` makes a circle
- Animation makes it rotate continuously
- Different border colors create the spinning effect

**Expected Outcome:**
- Circular spinner displays
- Spins continuously
- Purple accent color on top
- Centered in container

**Solution:** See `solutions/exercise2-hoc/LoadingSpinner.jsx`

### Task 2: Create withLoading HOC (Your Turn)

**🔨 TODO: Build the Higher-Order Component**

Create `src/hoc/withLoading.jsx`:

**Requirements:**
1. Import React and LoadingSpinner
2. Define interface `WithLoadingProps` with:
   - `isLoading: boolean`
3. Create function `withLoading` that:
   - Takes a generic type `P extends object`
   - Accepts parameter `WrappedComponent` of type `React.ComponentType<P>`
   - Returns a new component `WithLoadingComponent`
4. Inside the returned component:
   - Accept props: `{ isLoading, ...props }`
   - If `isLoading` is true, return LoadingSpinner
   - Otherwise, return `<WrappedComponent {...props as P} />`
5. Export as default

**Hints:**
- Generic `<P extends object>` allows any prop type
- Destructure `isLoading` from props, spread rest
- Use conditional rendering: `if (isLoading) return ...`
- Type casting `props as P` ensures type safety

**Expected Outcome:**
- HOC function is reusable for any component
- Shows spinner when loading
- Shows wrapped component when not loading
- TypeScript types work correctly

**Solution:** See `solutions/exercise2-hoc/withLoading.jsx`

### Task 3: Create ProductList Component (Your Turn)

**🔨 TODO: Build a Product List**

Create `src/components/ProductList/ProductList.jsx`:

**Requirements:**
1. Define interface `Product`:
   - id: number
   - name: string
   - price: number

2. Define interface `ProductListProps`:
   - products: Product[]

3. Create `ProductList` component that:
   - Accepts `products` prop
   - Maps over products array
   - For each product, render a div with:
     - className "product-item"
     - key={product.id}
     - h3 with product name
     - p with price (formatted as $XX.XX)
     - button "Add to Cart" with onClick alert
4. Wrap everything in div with className "product-list"
5. Export as default

**Hints:**
- Use `.map()` to render list
- Format price: `$${product.price.toFixed(2)}`
- Alert on click: `onClick={() => alert(\`Added ${product.name}\`)}`
- Don't forget `key` prop for each item

**Expected Outcome:**
- List of products displays
- Each product shows name and price
- Clicking "Add to Cart" shows alert
- No key prop warnings

**Solution:** See `solutions/exercise2-hoc/ProductList.jsx`

### Task 4: Apply HOC and Test (Your Turn)

**🔨 TODO: Use withLoading HOC**

Update `src/App.jsx`:

**Requirements:**
1. Import `useState`, `useEffect` from React
2. Import `withLoading` HOC
3. Import `ProductList` component
4. Create enhanced component:
   ```jsx
   const ProductListWithLoading = withLoading(ProductList);
   ```
5. In App component:
   - Create state: `isLoading` (initial: true)
   - Create state: `products` (initial: empty array)
   - Use `useEffect` to simulate API call:
     - Set timeout for 2000ms (2 seconds)
     - After timeout, set products data and isLoading to false
   - Render `<ProductListWithLoading isLoading={isLoading} products={products} />`

**Hints:**
- `useState(true)` for initial loading state
- useEffect with empty dependency array `[]` runs once
- setTimeout simulates async data fetch
- Pass both isLoading and products as props

**Expected Outcome:**
- Spinner shows for 2 seconds on page load
- Then displays list of products
- Smooth transition from loading to content
- Products are clickable

### Testing

1. Refresh page - should see spinner first
2. After 2 seconds - products appear
3. Click "Add to Cart" - alert shows
4. No console errors
5. Smooth loading experience

**Solution:** See `solutions/exercise2-hoc/`

---

---

## Exercise 3: Custom Hooks (Your Turn - 75% Practice)

### Concept Review

**Custom Hooks** are JavaScript functions that use React hooks and can be reused across components. They start with "use" and help encapsulate complex logic.

**Custom Hook Pattern:**
```jsx
function useCustomLogic() {
  const [state, setState] = useState();

  // Logic here

  return { state, helper };
}

// Usage:
const { state, helper } = useCustomLogic();
```

### Goals

- Create a `useForm` custom hook
- Implement form validation logic
- Build a registration form using the hook
- Understand hook reusability

### Task 1: Create useForm Hook (Your Turn)

**🔨 TODO: Build a Reusable Form Hook**

Create `src/hooks/useForm.ts`:

**Requirements:**
1. Import `useState` from React
2. Define interface `FormValues` (object with string keys and values)
3. Create function `useForm` that:
   - Accepts `initialValues` parameter (default: empty object)
   - Creates state `values` with initialValues
   - Creates state `errors` (empty object)
   - Creates `handleChange` function that:
     - Takes event parameter
     - Extracts `name` and `value` from event.target
     - Updates values state using spread operator
   - Creates `validate` function that:
     - Checks each value in values object
     - If value is empty, add error message
     - Returns true if no errors, false otherwise
   - Creates `handleSubmit` function that:
     - Accepts callback function
     - Returns function that accepts event
     - Prevents default form submission
     - Validates form
     - If valid, calls callback with values
   - Returns object: `{ values, errors, handleChange, handleSubmit }`
4. Export as default

**Hints:**
- Use `Record<string, any>` for flexible object types
- `Object.entries()` to loop through values
- `e.preventDefault()` stops form submission
- Return value should have all form utilities

**Expected Outcome:**
- Hook manages form state
- Handles input changes
- Validates required fields
- Provides submission handler
- Reusable across different forms

**Solution:** See `solutions/exercise3-custom-hooks/useForm.ts`

### Task 2: Create Registration Form (Your Turn - 80% Practice)

**🔨 TODO: Build Form Using useForm Hook**

Create `src/components/Form/RegistrationForm.jsx`:

**Requirements:**
1. Import useForm hook
2. Create `RegistrationForm` component
3. Initialize hook with initial values:
   - username: ""
   - email: ""
   - password: ""
4. Destructure: `{ values, errors, handleChange, handleSubmit }`
5. Create `onSubmit` function:
   - Accepts formData parameter
   - Console.log the data
   - Show alert "Registration successful!"
6. Return a form with:
   - onSubmit handler: `handleSubmit(onSubmit)`
   - Three form groups (username, email, password):
     - Input with name, value, onChange
     - Error message display (conditional)
   - Submit button
7. Import and create CSS file

**CSS Requirements:**
1. `.form-group` class:
   - Margin bottom: 1.5rem

2. `input` styles:
   - Width: 100%
   - Padding: 0.75rem
   - Border: 2px solid #e0e0e0
   - Border radius: 8px
   - Font size: 1rem

3. `.error` class:
   - Color: #e53e3e
   - Font size: 0.875rem
   - Margin top: 0.5rem

4. `button` styles:
   - Padding: 0.75rem 2rem
   - Background: gradient #667eea to #764ba2
   - Color: white
   - Border: none
   - Border radius: 8px
   - Cursor: pointer **Hints:**
- Input `name` attribute must match initial values keys
- Conditional rendering: `{errors.username && <span>{errors.username}</span>}`
- `type="email"` for email input
- `type="password"` for password input
- `type="submit"` for submit button

**Expected Outcome:**
- Form displays with 3 input fields
- Typing updates values
- Submitting empty form shows errors
- Valid submission shows alert
- Professional styling applied

### Testing

1. Try submitting empty form - should see error messages
2. Fill in fields - errors should disappear
3. Submit valid form - should see success alert
4. Check console - should log form data
5. Inputs should be styled nicely

**Solution:** See `solutions/exercise3-custom-hooks/`

---

---

## Exercise 4: Context API & Theme System (Final Challenge - 85% Practice)

### Concept Review

**Context API** provides a way to pass data through the component tree without prop drilling. Perfect for global state like themes, user auth, or language preferences.

**Context Pattern:**
```jsx
// 1. Create Context
const MyContext = createContext();

// 2. Create Provider
function MyProvider({ children }) {
  const [value, setValue] = useState();
  return <MyContext.Provider value={{value, setValue}}>{children}</MyContext.Provider>;
}

// 3. Use Context
const { value } = useContext(MyContext);
```

### Goals

- Create ThemeContext for global theme state
- Build ThemeProvider component
- Create custom useTheme hook
- Implement theme-aware components
- Apply theme switching across entire app

### Task 1: Create Theme Context (Your Turn)

**🔨 TODO: Build Theme Context System**

Create `src/context/ThemeContext.jsx`:

**Requirements:**
1. Import: createContext, useState, useContext, ReactNode
2. Define interface `ThemeContextType`:
   - theme: 'light' | 'dark'
   - toggleTheme: () => void
3. Create context:
   ```jsx
   const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
   ```
4. Define interface `ThemeProviderProps`:
   - children: ReactNode
5. Create `ThemeProvider` component:
   - Accept children prop
   - Create state: theme (initial: "light")
   - Create toggleTheme function (switches between light/dark)
   - Return ThemeContext.Provider with value={{ theme, toggleTheme }}
6. Create custom hook `useTheme`:
   - Use useContext(ThemeContext)
   - Throw error if used outside Provider
   - Return context
7. Export ThemeProvider and useTheme

**Hints:**
- Use type union: `'light' | 'dark'` for theme
- Toggle: `setTheme(prev => prev === 'light' ? 'dark' : 'light')`
- Error check ensures proper usage
- Custom hook simplifies consumer code

**Expected Outcome:**
- ThemeContext created successfully
- Provider manages theme state
- useTheme hook works in any component
- Type-safe context usage

**Solution:** See `solutions/exercise4-context/ThemeContext.jsx`

### Task 2: Create Themed Components (Your Turn - 90% Practice)

**🔨 TODO: Build Theme-Aware Button Components**

Create `src/components/ThemedComponents/ThemedComponents.jsx`:

**Requirements:**
1. Import useTheme hook and ReactNode
2. Define interface `ThemedButtonProps`:
   - children: ReactNode
   - onClick?: () => void
3. Create `ThemedButton` component:
   - Destructure: children, onClick from props
   - Get theme from useTheme()
   - Return button with:
     - className: `theme-button ${theme}`
     - onClick handler
     - children content
4. Create `ThemeToggle` component:
   - Get theme and toggleTheme from useTheme()
   - Return button that:
     - className: "theme-toggle"
     - onClick: toggleTheme
     - Text: Shows " Dark" when light, " Light" when dark
5. Export both components

Create `src/components/ThemedComponents/ThemedComponents.css`:

**CSS Requirements:**
1. `.theme-button` base styles:
   - Padding: 0.75rem 1.5rem
   - Border radius: 8px
   - Border: none
   - Font weight: 600
   - Cursor: pointer
   - Transition: all 0.3s ease

2. `.theme-button.light`:
   - Background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
   - Color: white

3. `.theme-button.dark`:
   - Background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%)
   - Color: #e2e8f0

4. `.theme-toggle`:
   - Position: fixed
   - Top: 1rem, Right: 1rem
   - Padding: 0.5rem 1rem
   - Background: transparent
   - Border: 2px solid current color
   - Border radius: 25px
   - Cursor: pointer
   - Font size: 1rem **Hints:**
- Template string for className: `theme-button ${theme}`
- Conditional rendering: `{theme === 'light' ? ' Dark' : ' Light'}`
- Fixed position keeps toggle visible
- Gradients different for each theme

**Expected Outcome:**
- Buttons change color based on theme
- Theme toggle button works
- Smooth color transitions
- Fixed toggle button in corner

**Solution:** See `solutions/exercise4-context/ThemedComponents.jsx`

### Task 3: Apply Global Theme Styling (Your Turn)

**🔨 TODO: Add Dark Mode CSS**

Update `src/index.css` or `src/App.css`:

**Requirements:**
1. Add theme class to body or root element
2. Define light theme variables:
   - --bg-color: #f5f5f5
   - --text-color: #333333
   - --card-bg: white
3. Define `.theme-dark` variables:
   - --bg-color: #1a202c
   - --text-color: #e2e8f0
   - --card-bg: #2d3748
4. Apply variables to elements:
   - body background: var(--bg-color)
   - body color: var(--text-color)
   - .card background: var(--card-bg)

**Hints:**
- CSS variables use `--variable-name` syntax
- Access with `var(--variable-name)`
- Theme class on root element cascades to children
- Smooth transition: `transition: background 0.3s ease`

**Expected Outcome:**
- Light theme: white background, dark text
- Dark theme: dark background, light text
- Smooth color transitions
- All components adapt to theme

### Task 4: Integrate Everything (Final Integration - 90% Practice)

**🔨 TODO: Build Complete Themed App**

Update `src/App.jsx`:

**Requirements:**
1. Import all components:
   - ThemeProvider
   - ThemeToggle, ThemedButton
   - Card
   - RegistrationForm
   - ProductListWithLoading (from Exercise 2)
2. Wrap entire app with `<ThemeProvider>`
3. Add theme class to App div using useTheme
4. Structure app with:
   - Header with title and ThemeToggle
   - Section with product cards
   - Section with registration form
5. Apply theme class to root div

**Hints:**
- ThemeProvider must wrap everything
- Use useTheme() hook to get current theme
- Add className: `theme-${theme}` to root div
- Organize sections with semantic HTML

**Expected Outcome:**
- Complete app with all features
- Theme toggle works globally
- All components change theme together
- Products load with spinner
- Form validation works
- Cards have hover effects
- Professional, polished UI

### Final Testing Checklist

**Theme System:**
- [ ] Click theme toggle - all components change color
- [ ] Button colors adapt to theme
- [ ] Background changes (light ↔ dark)
- [ ] Text remains readable in both themes

**Product List:**
- [ ] Spinner shows on page load
- [ ] Products appear after 2 seconds
- [ ] "Add to Cart" buttons work
- [ ] Cards have hover effect

**Registration Form:**
- [ ] Empty submission shows errors
- [ ] Filling fields clears errors
- [ ] Valid submission shows success
- [ ] Form styled properly in both themes

**Overall:**
- [ ] No console errors
- [ ] Smooth transitions everywhere
- [ ] Professional appearance
- [ ] All features work together

**Complete Solution:** See `solutions/exercise4-context/`

---

---

## Bonus Challenges (Optional - Advanced)

### Challenge 1: Error Boundary Component

**🔨 TODO: Implement Error Handling**

Error Boundaries catch JavaScript errors in component tree and display fallback UI.

**Requirements:**
1. Create class component `ErrorBoundary`
2. Add state: `{ hasError: false, error: null }`
3. Implement `static getDerivedStateFromError(error)`
4. Implement `componentDidCatch(error, errorInfo)`
5. Render fallback UI when error occurs
6. Wrap risky components with ErrorBoundary

**Hints:**
- Must be class component (not functional)
- getDerivedStateFromError updates state
- componentDidCatch logs errors
- Provides graceful error recovery

**Solution:** See `solutions/bonus-challenges/ErrorBoundary.jsx`

### Challenge 2: Modal with Portals

**🔨 TODO: Create Portal-Based Modal**

React Portals render children outside parent DOM hierarchy, perfect for modals.

**Requirements:**
1. Use `createPortal` from react-dom
2. Render modal to document.body
3. Add overlay with click-to-close
4. Include close button
5. Prevent body scroll when modal open

**Hints:**
- `createPortal(children, document.body)`
- Overlay: position fixed, full viewport
- `overflow: hidden` on body prevents scroll
- ESC key to close (bonus)

**Solution:** See `solutions/bonus-challenges/Modal.jsx`

### Challenge 3: useLocalStorage Hook

**🔨 TODO: Create Persistent State Hook**

Custom hook that syncs state with localStorage.

**Requirements:**
1. Accept key and initialValue
2. Load saved value from localStorage on mount
3. Save to localStorage on every update
4. Handle JSON parsing/stringifying
5. Return [value, setValue] like useState

**Hints:**
- `localStorage.getItem(key)`
- `localStorage.setItem(key, JSON.stringify(value))`
- Try/catch for parsing errors
- useEffect to sync on changes

**Solution:** See `solutions/bonus-challenges/useLocalStorage.ts`

---

## Key Takeaways

You've completed Lab 2! Here's what you've mastered:

### Component Architecture
- **Compound Components** Card system with subcomponents

- **HOC Pattern** withLoading for reusable functionality

- **Composition** Building complex UIs from simple parts

- **Type Safety** TypeScript interfaces for all components

### React Hooks
- **Custom Hooks** useForm for reusable form logic
- **useState** Managing local component state
- **useEffect** Side effects and data fetching
- **useContext** Consuming context values

### State Management
- **Context API** Global theme state without prop drilling

- **Provider Pattern** ThemeProvider wrapping app

- **Custom Context Hooks** useTheme for easy access

- **State Updates** Toggling and updating global state

### Advanced Patterns
- **Loading States** Spinner with HOC pattern

- **Form Handling** Validation and submission

- **Theme Switching** Complete dark mode implementation

- **Code Organization** Scalable folder structure

### TypeScript Integration
- **Generic Types** HOC with type parameters

- **Interface Definitions** Props and context types

- **Type Safety** Compile-time error prevention

- **Reusable Types** Shared interfaces

---

## Next Steps

**Ready for more?** Continue to [Lab 3 - API Integration & Data Management](../../lesson3-api-data/lab/lab3.md) to learn:

- **API Calls:** Fetching real data from REST APIs

- **React Query:** Advanced data fetching and caching

- **State Management:** Managing server state

- **Error Handling:** Graceful API error handling

- **Loading States:** Professional loading UIs

- **Full-Stack Integration:** Connecting React to backend

**Before starting Lab 3:**
- [ ] All Lab 2 exercises work correctly
- [ ] Understand compound components pattern
- [ ] Can create custom hooks
- [ ] Context API makes sense
- [ ] HOCs are clear
- [ ] TypeScript types understood
- [ ] Code is organized and clean

---

## Additional Resources

**Official Documentation:**
- [React Hooks Reference](https://react.dev/reference/react) - All built-in hooks
- [Context API Guide](https://react.dev/learn/passing-data-deeply-with-context) - Deep dive into Context
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) - Building custom hooks
- [TypeScript with React](https://react.dev/learn/typescript) - TypeScript patterns

**Patterns & Best Practices:**
- [Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks) - Kent C. Dodds
- [HOC Patterns](https://reactpatterns.com/) - Common React patterns
- [Hooks Best Practices](https://react.dev/learn#using-hooks) - Official guide

**Video Tutorials:**
- [React Hooks Deep Dive](https://www.youtube.com/results?search_query=react+hooks+tutorial) - Video guides
- [Context API Explained](https://www.youtube.com/results?search_query=react+context+api) - Visual learning

---

## Troubleshooting Guide

### Context Errors

**"useTheme must be used within ThemeProvider"**
- Ensure ThemeProvider wraps the component using useTheme
- Check that Provider is at root level in App.jsx
- Verify imports are correct

**Solution:**
```jsx
//  Correct
function App() {
  return (
    <ThemeProvider>
      <ComponentUsingTheme />
    </ThemeProvider>
  );
}

//  Wrong
function App() {
  return <ComponentUsingTheme />; // No provider!
}
```

### HOC Type Errors

**"Type X is not assignable to type Y"**
- Check generic type constraints
- Ensure props are properly spread
- Verify interface definitions match

**Solution:**
```jsx
// Ensure proper type casting
return <WrappedComponent {...props as P} />;
```

### Hook Dependency Warnings

**"React Hook useEffect has a missing dependency"**
- Add all dependencies to dependency array
- Use useCallback for function dependencies
- Disable ESLint rule only if intentional

**Solution:**
```jsx
useEffect(() => {
  fetchData();
}, [fetchData]); // Add all dependencies
```

### CSS Not Applying

**Styles don't update with theme**
- Check className uses theme variable
- Verify CSS variables are defined
- Ensure theme class applied to root element

**Solution:**
```jsx
// Apply theme class to root
<div className={`app theme-${theme}`}>
```

### Form Validation Issues

**Errors don't show/clear**
- Check conditional rendering syntax
- Verify error state updates
- Ensure handleChange updates values

**Solution:**
```jsx
// Conditional rendering
{errors.username && <span className="error">{errors.username}</span>}
```

---

## Self-Assessment Checklist

Before moving to Lab 3, you should be able to:

**Component Patterns:**
- [ ] Create compound components with subcomponents
- [ ] Build Higher-Order Components (HOCs)
- [ ] Use composition over props
- [ ] Understand when to use each pattern

**Hooks:**
- [ ] Create custom hooks for reusable logic
- [ ] Use useState, useEffect, useContext correctly
- [ ] Know when to create custom hooks
- [ ] Understand hook rules and best practices

**Context API:**
- [ ] Create Context with createContext
- [ ] Build Provider components
- [ ] Create custom context hooks
- [ ] Avoid prop drilling

**TypeScript:**
- [ ] Define interfaces for props
- [ ] Use generic types with HOCs
- [ ] Create type-safe context
- [ ] Type custom hooks correctly

**Project Structure:**
- [ ] Organize code in logical folders
- [ ] Separate concerns properly
- [ ] Follow naming conventions
- [ ] Keep components focused and small **If you can confidently do all above, you're ready for Lab 3!**

---

## ✅ Success Criteria Checklist

Before moving to Lesson 3, verify you can:

### **Component Patterns**
- [ ] Create compound components with subcomponents
- [ ] Build Higher-Order Components (HOCs)
- [ ] Use composition over props
- [ ] Understand when to use each pattern
- [ ] Create reusable component systems

### **Hooks**
- [ ] Create custom hooks for reusable logic
- [ ] Use useState, useEffect, useContext correctly
- [ ] Know when to create custom hooks
- [ ] Understand hook rules and best practices
- [ ] Combine multiple hooks effectively

### **Context API**
- [ ] Create Context with createContext
- [ ] Build Provider components
- [ ] Create custom context hooks
- [ ] Avoid prop drilling
- [ ] Manage global state properly

### **Advanced Features**
- [ ] Implement loading states with HOCs
- [ ] Handle form validation and submission
- [ ] Create theme switching functionality
- [ ] Build error boundaries
- [ ] Organize code in scalable structure **Goal: Check at least 18/20 items before Lesson 3**

---

