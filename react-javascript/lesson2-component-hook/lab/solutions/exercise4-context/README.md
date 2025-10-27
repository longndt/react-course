# Exercise 4 Solution: Context API Theme System

Complete solution for global theme management using Context API.

## Files Included

- `ThemeContext.jsx` - Context, Provider, and custom hook
- `ThemedComponents.jsx` - Theme-aware components
- `ThemedComponents.css` - Themed component styles
- `App.jsx` - Complete integration
- `App.css` - Global theme styles with CSS variables

## What This Solution Demonstrates

### Context API Pattern
Context provides a way to pass data through the component tree without prop drilling:

```jsx
// Create Context
const ThemeContext = createContext(undefined);

// Provide Value
<ThemeContext.Provider value={value}>
  {children}
</ThemeContext.Provider>

// Consume Value
const { theme } = useTheme();
```

### Custom Context Hook
Custom hook simplifies context consumption and adds error handling:

```jsx
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
```

### CSS Variables for Theming
CSS variables enable dynamic theme switching:

```css
.app.light {
  --bg-primary: #f7fafc;
  --text-primary: #2d3748;
}

.app.dark {
  --bg-primary: #1a202c;
  --text-primary: #e2e8f0;
}
```

## How to Use

### 1. Wrap App with ThemeProvider

```jsx
function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Use Theme in Components

```jsx
function MyComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme}>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}
```

### 3. Create Themed Components

```jsx
function ThemedButton({ children }) {
  const { theme } = useTheme();

  return (
    <button className={`btn ${theme}`}>
      {children}
    </button>
  );
}
```

## Key Features

1. **Global State** Theme accessible anywhere in component tree
2. **No Prop Drilling** Direct access via useTheme() hook
3. **Type Safety** Full TypeScript support
4. **Error Handling** Throws error if used outside provider
5. **CSS Variables** Dynamic theme colors
6. **Smooth Transitions** Animated theme switching

## Context API Benefits

### No Prop Drilling
```jsx
//  Without Context (Prop Drilling)
<App theme={theme}>
  <Layout theme={theme}>
    <Sidebar theme={theme}>
      <Button theme={theme} />
    </Sidebar>
  </Layout>
</App>

//  With Context
<ThemeProvider>
  <App>
    <Layout>
      <Sidebar>
        <Button /> {/* Access theme via useTheme() */}
      </Sidebar>
    </Layout>
  </App>
</ThemeProvider>
```

### Easy Updates
```jsx
// Any component can toggle theme
function AnyComponent() {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Toggle</button>;
}
```

## Learning Points

- **Context API** Global state without prop drilling

- **Provider Pattern** Wrap app with data provider

- **Custom Hooks** Simplify context consumption

- **CSS Variables** Dynamic theming technique

- **Error Boundaries** Validate hook usage

- **Reusable Context** Flexible global state management

## Code Highlights

### Context Creation
```jsx
/**
 * @typedef {Object} ThemeContextValue
 * @property {string} theme - Current theme ('light' or 'dark')
 * @property {Function} toggleTheme - Function to toggle theme
 */

const ThemeContext = createContext(undefined);
```

### Provider Implementation
```jsx
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Custom Hook with Validation
```jsx
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
```

### CSS Variables Usage
```css
.app {
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.3s ease;
}
```

## Testing Checklist

- [ ] App loads in light mode by default
- [ ] Toggle button switches to dark mode
- [ ] All components update with theme
- [ ] Buttons show correct theme colors
- [ ] CSS transitions are smooth
- [ ] Theme persists across components
- [ ] Error if useTheme used outside provider
- [ ] No console errors

## Common Context Use Cases

### Authentication
```jsx
/**
 * @typedef {Object} AuthContextValue
 * @property {Object|null} user - Current user or null
 * @property {Function} login - Async login function
 * @property {Function} logout - Logout function
 */

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // ...
}
```

### Language/i18n
```jsx
/**
 * @typedef {Object} LanguageContextValue
 * @property {string} language - Current language code
 * @property {Function} setLanguage - Function to change language
 * @property {Function} t - Translation function
 */
```

### Shopping Cart
```jsx
/**
 * @typedef {Object} CartContextValue
 * @property {Array} items - Cart items array
 * @property {Function} addItem - Function to add item
 * @property {Function} removeItem - Function to remove item
 * @property {number} total - Total cart value
 */
```

## Extensions

### Persist Theme to localStorage
```jsx
const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "light";
});

const toggleTheme = () => {
  setTheme(prev => {
    const newTheme = prev === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    return newTheme;
  });
};
```

### System Preference Detection
```jsx
const getSystemTheme = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const [theme, setTheme] = useState(getSystemTheme);
```

### Multiple Themes
```jsx
type Theme = "light" | "dark" | "blue" | "green";

const themes = {
  light: { primary: "#667eea", bg: "#f7fafc" },
  dark: { primary: "#4299e1", bg: "#1a202c" },
  blue: { primary: "#3182ce", bg: "#ebf8ff" },
  green: { primary: "#38a169", bg: "#f0fff4" },
};
```

## Context vs Other Solutions

### Context API
- Built into React
- No dependencies
- Simple for small/medium apps
- Re-renders all consumers on update
- No dev tools

### Redux
- Advanced dev tools
- Middleware support
- Better performance
- More boilerplate
- Steeper learning curve

### Zustand
- Minimal boilerplate
- Better performance
- Easy to learn
- External dependency

**Use Context for:**
- Theme, language, auth
- Small to medium apps
- Simple global state
- Learning React patterns

## Next Steps

After understanding this solution:
1. Add more context values (user, cart, etc.)
2. Implement localStorage persistence
3. Add system theme detection
4. Create multiple theme options
5. Combine multiple contexts
6. Compare with Redux/Zustand

This pattern is used in most production React applications!
