# Lab 1 - React Fundamentals & Project Setup

## 📋 Overview

In this lab session, you'll create a simple Welcome Page application using JavaScript and React. This hands-on lab focuses on practical application of React fundamentals through guided exercises and independent practice sections.

##  Learning Objectives

By completing this lab, you will be able to:
- Set up a React + JavaScript project using Vite
- Create and organize React functional components
- Use JSX syntax to embed JavaScript in components
- Apply CSS styling to React components
- Build a multi-component landing page application

##  Pre-Lab Checklist

- [ ] Node.js v18+ installed (`node --version` to verify)
- [ ] VS Code with React extensions installed
- [ ] Basic understanding of JavaScript ES6+ (functions, arrow functions, array methods)
- [ ] Familiarity with HTML/CSS
- [ ] Command line basics (navigate folders, run commands)

---

## Exercise 1: Project Setup & First Component (Guided)

###  Concept Review

React is a JavaScript library for building user interfaces using **components** - reusable, self-contained pieces of UI. Vite is a modern build tool that provides fast development experience with hot module replacement (HMR).

###  Goals

- Create a React + JavaScript project
- Understand project structure
- Create and render your first component

### Step 1: Create JavaScript React Project

Open your terminal and run:

```bash
# Create new project with React template
npm create vite@latest my-welcome-page -- --template react

# Navigate to project
cd my-welcome-page

# Install dependencies
npm install

# Install PropTypes for runtime type checking
npm install prop-types

# Start development server
npm run dev
```

**Verify:** Browser should open at `http://localhost:5173` showing default Vite + React page.

### Step 2: Understand Project Structure

```
my-welcome-page/
├── node_modules/     # Dependencies (auto-generated, don't edit)
├── public/           # Static files (images, icons)
├── src/              # 👈 Your code goes here
│   ├── App.jsx       # Main application component
│   ├── App.css       # Styles for App component
│   ├── main.jsx      # Entry point (connects React to index.html)
│   ├── index.css     # Global styles
│   └── assets/       # Images, fonts, etc.
├── index.html        # HTML template
├── package.json      # Project dependencies and scripts
└── vite.config.js    # Vite bundler configuration
```

**Key Files to Focus On:**
- `src/App.jsx` - Your main component (we'll edit this)
- `src/App.css` - Styles for your app
- `src/main.jsx` - Entry point (usually don't touch)
- `index.html` - HTML template with `<div id="root"></div>` where React mounts

### Step 3: Clean Up Default Project

Replace `src/App.jsx` with a clean starting point:

```jsx
// src/App.jsx
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>My First React App</h1>
      <p>This is a clean starting point!</p>
    </div>
  );
}

export default App;
```

Replace `src/App.css`:

```css
/* src/App.css */
.App {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  color: #666;
  font-size: 1.125rem;
  line-height: 1.6;
}
```

**Checkpoint:** Save files and check browser - you should see "My First React App" heading with clean styling.

###  Testing

1. Open browser to `http://localhost:5173`
2. You should see centered heading and paragraph
3. Try editing the text in `App.jsx` - browser should auto-refresh (HMR)

---

## Exercise 2: Create Your First Component (Your Turn - 60% Practice)

###  Concept Review

A **React component** is a JavaScript function that returns JSX (HTML-like syntax). Components let you split the UI into independent, reusable pieces. You can embed JavaScript expressions in JSX using curly braces `{}`.

**Example component structure:**
```jsx
function ComponentName() {
  const variable = "value";

  return (
    <div>
      <h2>Text with {variable}</h2>
    </div>
  );
}

export default ComponentName;
```

###  Goals

- Create a `components` folder for organization
- Build a `Welcome` component with JavaScript variables
- Import and use the component in App

### Step 1: Create Components Folder (Guided)

Create the components directory:

```bash
# Create components directory
mkdir src/components
```

Or create it manually in VS Code: Right-click on `src` → New Folder → `components`

### Step 2: Build Welcome Component (Your Turn)

**🔨 TODO: Create the Welcome Component**

Create a new file `src/components/Welcome.jsx` and implement:

**Requirements:**
1. Create a function component named `Welcome`
2. Define these variables inside the component:
   - `studentName` - your name (string)
   - `courseName` - "React Fundamentals" (string)
   - `currentYear` - the current year using `new Date().getFullYear()`
3. Return JSX with:
   - A `<div>` with className "welcome"
   - An `<h2>` that says "Welcome, {studentName}!"
   - A `<p>` that says "You're learning: {courseName}"
   - A `<p>` with className "small-text" that shows "© {currentYear}"
4. Export the component as default

**Hints:**
- Use `function Welcome() { }` to create the component
- Put variables before the `return` statement
- Use `{variableName}` to embed JavaScript in JSX
- Don't forget `export default Welcome;` at the end
- Use `className` instead of `class` for CSS classes

**Expected Outcome:**
- File `src/components/Welcome.jsx` exists
- Component has 3 variables defined
- JSX displays all variables correctly
- No syntax errors in VS Code

**Solution:** See `solutions/exercise2-welcome/Welcome.jsx`

### Step 3: Use Component in App (Your Turn)

**🔨 TODO: Import and Render Welcome Component**

Update `src/App.jsx`:

**Requirements:**
1. Import the Welcome component at the top
2. Replace the `<h1>` and `<p>` with `<Welcome />`
3. Keep the App div wrapper

**Hints:**
- Import syntax: `import Welcome from './components/Welcome';`
- Use component like an HTML tag: `<Welcome />`
- Self-closing tags need the `/` at the end

**Expected Outcome:**
- Browser shows "Welcome, [Your Name]!"
- Shows course name and current year
- No console errors

###  Testing

1. Open `http://localhost:5173`
2. You should see your welcome message with your name
3. Current year should display correctly (e.g., 2024)
4. Open DevTools Console (F12) - should be no errors

**Solution:** See `solutions/exercise2-welcome/` for complete code

---

## Exercise 3: Add Styling to Components (Your Turn - 70% Practice)

###  Concept Review

React components can have their own CSS files. Import CSS files at the top of the component file using `import './ComponentName.css'`. This keeps styles organized and scoped to each component.

**CSS Module Pattern:**
```jsx
import './MyComponent.css';  // Import CSS

function MyComponent() {
  return <div className="my-component">Content</div>;
}
```

###  Goals

- Create a CSS file for the Welcome component
- Apply gradient background and modern styling
- Import CSS into the component

### Step 1: Create CSS File (Your Turn)

**🔨 TODO: Style the Welcome Component**

Create `src/components/Welcome.css`:

**Requirements:**
1. Create `.welcome` class with:
   - Background: linear gradient from `#667eea` to `#764ba2` (135deg angle)
   - Text color: white
   - Padding: 3rem for top/bottom, 2rem for left/right
   - Border radius: 12px
   - Margin bottom: 2rem
   - Box shadow: `0 4px 6px rgba(0, 0, 0, 0.1)`

2. Style `.welcome h2`:
   - Margin: 0 for top/left/right, 1rem for bottom
   - Font size: 2rem

3. Style `.welcome p`:
   - Margin: 0.5rem for top/bottom, 0 for left/right
   - Color: `rgba(255, 255, 255, 0.9)` (slightly transparent white)

4. Style `.welcome .small-text`:
   - Font size: 0.875rem
   - Margin top: 1.5rem
   - Opacity: 0.7

**Hints:**
- Use `background: linear-gradient(135deg, color1, color2);`
- `padding: 3rem 2rem` means vertical horizontal
- Use nested selectors: `.welcome h2 { }`
- `rgba(255, 255, 255, 0.9)` is white with 90% opacity

**Expected Outcome:**
- Welcome section has purple gradient background
- White text is clearly visible
- Rounded corners and shadow effect
- Copyright text is smaller and slightly faded

### Step 2: Import CSS (Your Turn)

**🔨 TODO: Link CSS to Component**

Update `src/components/Welcome.jsx`:

**Requirements:**
1. Add CSS import at the top of the file (before the function)
2. Import path should be `'./Welcome.css'`

**Hints:**
- Import goes above the function definition
- Syntax: `import './FileName.css';`
- Make sure the path is correct (same folder)

**Expected Outcome:**
- Purple gradient background appears
- All styling from CSS file is applied
- No console errors

###  Testing

1. Refresh browser - Welcome component should have gradient background
2. Text should be white and clearly readable
3. Hover might show shadow effect
4. Check DevTools → Elements → Inspect the `.welcome` div to verify CSS is applied

**Solution:** See `solutions/exercise3-styling/`

---

## Exercise 4: Build Multi-Component Landing Page (Your Turn - 80% Practice)

###  Concept Review

Real applications are built from many components working together. The `.map()` method is commonly used to render lists in React. Each item in a list needs a unique `key` prop.

**List Rendering Example:**
```jsx
const items = ["Item 1", "Item 2", "Item 3"];

return (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);
```

###  Goals

- Create Feature component with list rendering
- Create Footer component with links
- Compose multiple components in App
- Build a complete landing page

### Task 1: Create Feature Component (Your Turn)

**🔨 TODO: Build the Features Section**

Create `src/components/Feature.jsx` and `src/components/Feature.css`:

**Requirements for Feature.jsx:**
1. Create a `features` array with these strings:
   - "Learn React fundamentals"
   - "Build modern web applications"
   - "Use PropTypes for runtime validation"
2. Return JSX with:
   - A `<div>` with className "features"
   - An `<h3>` with text "What You'll Learn"
   - A `<ul>` that maps over the features array
   - Each `<li>` should display a feature and have `key={index}`
3. Import `'./Feature.css'`
4. Export as default

**Requirements for Feature.css:**
1. `.features` class:
   - Background color: #f8f9fa
   - Padding: 2rem
   - Border radius: 8px
   - Margin bottom: 2rem

2. `.features h3`:
   - Color: #333
   - Margin: 0 0 1.5rem 0
   - Font size: 1.5rem

3. `.features ul`:
   - List style: none
   - Padding: 0
   - Margin: 0

4. `.features li`:
   - Padding: 0.75rem 1rem
   - Margin bottom: 0.75rem
   - Background: white
   - Border left: 4px solid #667eea
   - Border radius: 4px
   - Box shadow: `0 2px 4px rgba(0, 0, 0, 0.05)`

5. `.features li:last-child`:
   - Margin bottom: 0

**Hints:**
- Array syntax: `const arr = ["item1", "item2"];`
- Map syntax: `{array.map((item, index) => (<li key={index}>{item}</li>))}`
- Don't forget to import CSS at the top
- `border-left: 4px solid #667eea` creates the colored left border

**Expected Outcome:**
- Component displays "What You'll Learn" heading
- Shows 3 feature items in a list
- Each item has white background with blue left border
- Light gray background for the whole section

### Task 2: Create Footer Component (Your Turn)

**🔨 TODO: Build the Footer with Links**

Create `src/components/Footer.jsx` and `src/components/Footer.css`:

**Requirements for Footer.jsx:**
1. Create a `links` array of objects with this structure:
   ```jsx
   { name: "React Docs", url: "https://react.dev" }
   { name: "JavaScript ES6", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
   { name: "Vite", url: "https://vitejs.dev" }
   ```
2. Return JSX with:
   - A `<footer>` with className "footer"
   - A `<p>` with text "Useful Resources:"
   - A `<div>` with className "links" that maps over the links array
   - Each link should be an `<a>` tag with:
     - `key={index}`
     - `href={link.url}`
     - `target="_blank"`
     - `rel="noopener noreferrer"`
     - Text content: `{link.name}`
3. Import `'./Footer.css'`
4. Export as default

**Requirements for Footer.css:**
1. `.footer`:
   - Margin top: 3rem
   - Padding top: 2rem
   - Border top: 2px solid #e0e0e0
   - Text align: center

2. `.footer p`:
   - Color: #666
   - Margin bottom: 1rem
   - Font size: 0.875rem
   - Text transform: uppercase
   - Letter spacing: 0.05em

3. `.footer .links`:
   - Display: flex
   - Justify content: center
   - Gap: 2rem
   - Flex wrap: wrap

4. `.footer a`:
   - Color: #667eea
   - Text decoration: none
   - Font weight: 500
   - Transition: color 0.2s ease

5. `.footer a:hover`:
   - Color: #764ba2
   - Text decoration: underline

**Hints:**
- Object array: `[{ name: "...", url: "..." }, ...]`
- Access object properties: `link.name`, `link.url`
- `target="_blank"` opens link in new tab
- `rel="noopener noreferrer"` is for security with external links
- Flexbox centers items: `display: flex; justify-content: center;`

**Expected Outcome:**
- Footer appears at bottom with border on top
- Shows "USEFUL RESOURCES:" in uppercase
- Three links displayed horizontally
- Links change color on hover
- Links open in new tab when clicked

### Task 3: Compose Landing Page (Your Turn)

**🔨 TODO: Combine All Components**

Update `src/App.jsx`:

**Requirements:**
1. Import Welcome, Feature, and Footer components
2. Render them in this order inside the App div:
   - `<Welcome />`
   - `<Feature />`
   - `<Footer />`
3. Keep the existing App.css import and App div wrapper

**Hints:**
- You need 3 import statements at the top
- Import paths: `'./components/ComponentName'`
- Components are used like HTML tags: `<ComponentName />`
- Keep everything inside the `<div className="App">` wrapper

**Expected Outcome:**
- Complete landing page with all three sections
- Welcome section with gradient at top
- Features section in the middle
- Footer with links at bottom
- All sections styled correctly
- No console errors

###  Testing Your Landing Page

**Visual Check:**
1.  Purple gradient Welcome section with your name
2.  Light gray Features section with 3 items
3.  Footer with 3 clickable resource links

**Functionality Check:**
1. Click each footer link - should open in new tab
2. Hover over links - should change color
3. Resize browser - page should remain centered

**Code Quality Check:**
1. Open DevTools Console (F12) - should be no errors
2. Check Elements tab - all CSS classes applied correctly
3. Verify all components are properly imported

**Solution:** See `solutions/exercise4-landing-page/` for complete implementation

---

## Bonus Challenge: Add Interactivity (Optional - 90% Practice)

###  Challenge Goals

Add interactive elements to your landing page to get a preview of React's event handling. This is optional but will give you a head start on Lesson 2!

### Challenge 1: Add About Section

**🔨 TODO: Create an About Component**

**Requirements:**
1. Create `src/components/About.jsx` and `About.css`
2. Component should display:
   - Your name
   - Your major
   - Your university
   - A brief personal message
3. Style it with a card-like design (white background, shadow, padding)
4. Import and render it in App between Feature and Footer

**Hints:**
- Use similar structure to Welcome component
- Define variables for name, major, university
- Apply styling similar to Feature component
- Use flexbox or grid for better layout

**Expected Outcome:**
- Personal info displays in a styled card
- Card appears between Features and Footer sections

### Challenge 2: Add Click Alert

**🔨 TODO: Add Interactive Button**

**Requirements:**
1. Update Welcome component to include a button
2. Create a function `handleClick` that shows an alert: "Welcome to React! "
3. Button should call `handleClick` when clicked
4. Style the button with:
   - Background color matching the gradient
   - White text
   - Padding and border radius
   - Hover effect

**Hints:**
- Function syntax: `const handleClick = () => { alert('...'); };`
- Button syntax: `<button onClick={handleClick}>Click Me!</button>`
- Place function before the return statement
- Add button styles to Welcome.css

**Expected Outcome:**
- Button appears in Welcome section
- Clicking button shows alert message
- Button has hover effect

### Challenge 3: Dynamic Theme Toggle

**🔨 TODO: Add Dark Mode Toggle (Advanced)**

This is an advanced challenge that previews state management from Lesson 2!

**Requirements:**
1. Add a theme toggle button in the header
2. Clicking it should change the page background color
3. (Note: This will require useState from Lesson 2 to work properly)

**Solutions:** See `solutions/bonus-challenges/` for all challenge solutions

---

##  Key Takeaways

You've completed Lab 1. Here's what you've mastered:

### Project Setup
-  Created React + JavaScript project with Vite
-  Understood project folder structure and key files
-  Installed dependencies and ran development server
-  Experienced Hot Module Replacement (HMR)

### Component Fundamentals
-  Created functional components using function syntax
-  Organized components in separate files and folders
-  Used `export default` and `import` for component modules
-  Composed multiple components into a complete application

### JSX & JavaScript
-  Embedded JavaScript in JSX using `{}`
-  Rendered lists with `.map()` and `key` prop
-  Applied `className` for styling (not `class`)
-  Wrote clean React components with JavaScript ES6+

### Styling
-  Created CSS files for individual components
-  Imported CSS in component files
-  Applied modern CSS (flexbox, gradients, transitions)
-  Built responsive, centered layouts

### Project Organization
-  Separated concerns (components vs styles vs logic)
-  Followed React conventions and best practices
-  Built maintainable, modular code structure

---

##  Next Steps

You're now ready for more advanced React concepts!

**Continue to [Lab 2 - Component Architecture & React Hooks](../../lesson2-component-hook/lab/lab2.md)** to learn:

- **Props:** Pass data from parent to child components
- **State:** Manage interactive UI with `useState` hook
- **Effects:** Handle side effects with `useEffect` hook
- **Custom Hooks:** Create reusable logic
- **Component Patterns:** Build professional component libraries

**Before starting Lab 2:**
- [ ] Make sure all exercises in this lab work correctly
- [ ] Review your code and understand each part
- [ ] Push your project to GitHub (optional but recommended)
- [ ] Take a short break - you've earned it!

---

##  Additional Resources

**Official Documentation:**
- [React Documentation](https://react.dev) - Official React docs
- [JavaScript ES6 Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Modern JavaScript
- [Vite Guide](https://vitejs.dev/guide/) - Vite build tool docs

**Helpful Articles:**
- [Thinking in React](https://react.dev/learn/thinking-in-react) - React mental model
- [JSX In Depth](https://react.dev/learn/writing-markup-with-jsx) - Understanding JSX
- [Component Best Practices](https://react.dev/learn/your-first-component) - Writing better components

**Video Tutorials:**
- [React in 100 Seconds](https://www.youtube.com/watch?v=Tn6-PIqc4UM) - Quick overview
- [React JavaScript Tutorial](https://www.youtube.com/results?search_query=react+javascript+tutorial) - Video guides

---

##  Troubleshooting

### Common Issues and Solutions

#### Port 5173 already in use
```bash
# Windows: Open Task Manager → End Node.js process
# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

#### Module not found errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### CSS not applying
-  Verify CSS file is imported: `import './Component.css'`
-  Check `className` spelling matches CSS file exactly
-  Clear browser cache: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
-  Check browser DevTools → Elements → See if CSS is loaded

#### JSX syntax errors
-  Verify all imports have correct file paths
-  Check file extensions (`.jsx` for components with JSX, `.js` for utilities)
-  Restart VS Code language server: `Ctrl+Shift+P` → "Developer: Restart Extension Host"
-  Make sure all components are properly formatted

#### Component not rendering
-  Check if component is imported correctly
-  Verify component is used in JSX: `<ComponentName />`
-  Make sure component has `export default`
-  Check browser console for error messages

#### Development server issues
```bash
# Clear cache and restart
npm run dev -- --force

# Or try clearing Vite cache
rm -rf node_modules/.vite
npm run dev
```

**Still stuck?**
- Check the solutions folder: `solutions/`
- Review the error message carefully
- Search the error on Google or Stack Overflow
- Ask for help in the course forum

---

##  Submission Checklist

Before moving to Lab 2, verify:

- [ ] Project runs without errors (`npm run dev`)
- [ ] Welcome component displays with your name and current year
- [ ] Feature component shows 3 features in a styled list
- [ ] Footer component has 3 working external links
- [ ] All components have CSS styling applied correctly
- [ ] Components are properly imported in App.jsx
- [ ] No console errors in browser DevTools
- [ ] Code is well-organized in folders (components, CSS files)
- [ ] You understand what each piece of code does
- [ ] All TODO sections completed successfully

**Optional but recommended:**
- [ ] Completed at least one bonus challenge
- [ ] Pushed code to GitHub repository
- [ ] Added readme.md with project description
- [ ] Tested on different screen sizes (responsive design)

---


---

##  Bonus Challenges

Ready to take your skills to the next level? Try these optional challenges:

### Challenge 1: Interactive Counter Component

Create a `Counter` component with increment/decrement buttons.

**Requirements:**
- Display a number starting at 0
- "+" button increases the count
- "-" button decreases the count
- Use `useState` hook (preview of Lab 2!)

**Hint:**
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // TODO: Create increment and decrement functions
  // TODO: Add buttons and display count
}
```

### Challenge 2: Theme Toggle (Dark/Light Mode)

Add a theme switcher to toggle between light and dark mode.

**Requirements:**
- Button to toggle themes
- Change background and text colors
- Persist theme choice (use localStorage - research needed!)

**Hint:**
```jsx
// In App.jsx
const [theme, setTheme] = useState('light');

// Apply theme class to main div
<div className={`App ${theme}-theme`}>
```

### Challenge 3: Responsive Navigation Menu

Create a mobile-responsive navigation menu.

**Requirements:**
- Desktop: Horizontal menu
- Mobile: Hamburger menu (☰) that toggles visibility
- Smooth animations
- Works on screens < 768px

**CSS Hints:**
```css
@media (max-width: 768px) {
  .nav-links {
    display: none; /* Hide by default */
  }

  .nav-links.active {
    display: flex;
    flex-direction: column;
  }
}
```

### Challenge 4: Contact Form Component

Build a functional contact form with validation.

**Requirements:**
- Name, Email, Message fields
- Basic validation (email format, required fields)
- Display error messages
- Success message on submit

**Preview of useState:**
```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});
```

### Challenge 5: Image Gallery with Lightbox

Create an image gallery with click-to-enlarge functionality.

**Requirements:**
- Grid of thumbnail images
- Click image to view full size (modal/lightbox)
- Previous/Next navigation
- Close button

**Advanced:** Add keyboard navigation (arrow keys, ESC to close)

---

##  Additional Resources for Challenges

- [React useState Hook](https://react.dev/reference/react/useState)
- [CSS Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

---

---

## ✅ Success Criteria Checklist

Before moving to Lesson 2, verify you can:

### **React Fundamentals**
- [ ] Create functional components with JSX
- [ ] Use props to pass data between components
- [ ] Handle events with onClick, onChange, onSubmit
- [ ] Understand component re-rendering
- [ ] Use conditional rendering (if, &&, ternary)
- [ ] Render lists with proper keys

### **State Management**
- [ ] Use useState for component state
- [ ] Use useEffect for side effects
- [ ] Understand dependency arrays
- [ ] Avoid infinite re-render loops
- [ ] Clean up side effects properly
- [ ] Use functional state updates

### **Development Setup**
- [ ] Set up React project with Vite
- [ ] Configure ESLint and Prettier
- [ ] Debug with React DevTools
- [ ] Structure project files properly
- [ ] Use environment variables

### **Styling**
- [ ] Apply CSS classes with className
- [ ] Use CSS modules for scoped styles
- [ ] Create responsive layouts
- [ ] Handle hover and focus states
- [ ] Use CSS custom properties
- [ ] Implement basic animations

### **Forms and Input**
- [ ] Create controlled form inputs
- [ ] Handle form submission
- [ ] Validate user input
- [ ] Show loading states
- [ ] Display error messages
- [ ] Reset forms after submission

**Goal: Check at least 18/24 items before Lesson 2**

---

These bonus challenges will prepare you for Lab 2's advanced patterns.
