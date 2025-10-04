# Lab 1: Building Your First React Application

## Overview

In this lab session, you'll create a simple Welcome Page application using TypeScript and React. This project demonstrates basic React setup, creating your first components, and applying simple styles.

> 💡 **Scope:** This lab focuses ONLY on fundamentals - setup and simple components. Advanced topics like props, state, and hooks are covered in Lab 2.

## Exercises

- Exercise 1: Project Setup
- Exercise 2: Create Your First Component
- Exercise 3: Add Styling
- Exercise 4: Build a Simple Landing Page

## Pre-Lab Checklist

- [ ] Node.js v18+ installed
- [ ] VS Code with React extensions installed
- [ ] Basic understanding of JavaScript ES6+
- [ ] Familiarity with HTML/CSS

---

## Exercise 1: Project Setup (15 minutes)

### Step 1: Create TypeScript React Project

```bash
# Create new project with TypeScript template
npm create vite@latest my-welcome-page -- --template react-ts

# Navigate to project
cd my-welcome-page

# Install dependencies
npm install

# Start development server
npm run dev
```

**✅ Verify:** Browser should open at `http://localhost:5173` showing default Vite + React page.

### Step 2: Understand Project Structure

```
my-welcome-page/
├── node_modules/     # Dependencies (auto-generated, don't edit)
├── public/           # Static files (images, icons)
├── src/              # 👈 Your code goes here
│   ├── App.tsx       # Main application component
│   ├── App.css       # Styles for App component
│   ├── main.tsx      # Entry point (connects React to index.html)
│   ├── index.css     # Global styles
│   └── assets/       # Images, fonts, etc.
├── index.html        # HTML template
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite bundler configuration
```

**Key Files to Focus On:**
- `src/App.tsx` - Your main component (we'll edit this)
- `src/App.css` - Styles for your app
- `src/main.tsx` - Entry point (usually don't touch)

### Step 3: Clean Up Default Project

Replace `src/App.tsx` with clean starting point:

```tsx
// src/App.tsx
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

**✅ Checkpoint:** Save files and check browser - you should see "My First React App" heading.

---

## Exercise 2: Create Your First Component (20 minutes)

### Step 1: Create Components Folder

```bash
# Create components directory
mkdir src/components
```

### Step 2: Create Welcome Component

Create new file `src/components/Welcome.tsx`:

```tsx
// src/components/Welcome.tsx
function Welcome() {
  const studentName = "Student";
  const courseName = "React Fundamentals";
  const currentYear = new Date().getFullYear();

  return (
    <div className="welcome">
      <h2>Welcome, {studentName}!</h2>
      <p>You're learning: {courseName}</p>
      <p className="small-text">© {currentYear}</p>
    </div>
  );
}

export default Welcome;
```

**Key Concepts:**
- `function Welcome()` - This is a component (like a JavaScript function)
- `const studentName = ...` - JavaScript variables
- `{studentName}` - Embedding JavaScript in JSX using `{}`
- `export default Welcome` - Makes component available for import

### Step 3: Use Welcome Component in App

Update `src/App.tsx`:

```tsx
// src/App.tsx
import './App.css';
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">
      <Welcome />
    </div>
  );
}

export default App;
```

**✅ Checkpoint:** Browser should show your Welcome component with embedded JavaScript variables.

---

## Exercise 3: Add Styling (15 minutes)

### Step 1: Create Component CSS File

Create `src/components/Welcome.css`:

```css
/* src/components/Welcome.css */
.welcome {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.welcome h2 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
}

.welcome p {
  margin: 0.5rem 0;
  color: rgba(255, 255, 255, 0.9);
}

.welcome .small-text {
  font-size: 0.875rem;
  margin-top: 1.5rem;
  opacity: 0.7;
}
```

### Step 2: Import CSS in Component

Update `src/components/Welcome.tsx`:

```tsx
// src/components/Welcome.tsx
import './Welcome.css';  // 👈 Add this line

function Welcome() {
  const studentName = "Student";
  const courseName = "React Fundamentals";
  const currentYear = new Date().getFullYear();

  return (
    <div className="welcome">
      <h2>Welcome, {studentName}!</h2>
      <p>You're learning: {courseName}</p>
      <p className="small-text">© {currentYear}</p>
    </div>
  );
}

export default Welcome;
```

**✅ Checkpoint:** Component should now have purple gradient background with styled text.

---

## Exercise 4: Build a Simple Landing Page (30 minutes)

### Step 1: Create Feature Component

Create `src/components/Feature.tsx`:

```tsx
// src/components/Feature.tsx
import './Feature.css';

function Feature() {
  const features = [
    "Learn React fundamentals",
    "Build modern web applications",
    "Use TypeScript for type safety"
  ];

  return (
    <div className="features">
      <h3>What You'll Learn</h3>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}

export default Feature;
```

Create `src/components/Feature.css`:

```css
/* src/components/Feature.css */
.features {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.features h3 {
  color: #333;
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
}

.features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features li {
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  background: white;
  border-left: 4px solid #667eea;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.features li:last-child {
  margin-bottom: 0;
}
```

### Step 2: Create Footer Component

Create `src/components/Footer.tsx`:

```tsx
// src/components/Footer.tsx
import './Footer.css';

function Footer() {
  const links = [
    { name: "React Docs", url: "https://react.dev" },
    { name: "TypeScript", url: "https://www.typescriptlang.org" },
    { name: "Vite", url: "https://vitejs.dev" }
  ];

  return (
    <footer className="footer">
      <p>Useful Resources:</p>
      <div className="links">
        {links.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
```

Create `src/components/Footer.css`:

```css
/* src/components/Footer.css */
.footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #e0e0e0;
  text-align: center;
}

.footer p {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer .links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.footer a:hover {
  color: #764ba2;
  text-decoration: underline;
}
```

### Step 3: Combine All Components

Update `src/App.tsx`:

```tsx
// src/App.tsx
import './App.css';
import Welcome from './components/Welcome';
import Feature from './components/Feature';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Welcome />
      <Feature />
      <Footer />
    </div>
  );
}

export default App;
```

**✅ Final Checkpoint:** Your landing page should have:
- Welcome section with gradient background
- Features list with styled items
- Footer with useful links

---

## Challenge Exercises (Optional)

### Challenge 1: Add Another Section

Create a `src/components/About.tsx` component with information about yourself:

```tsx
function About() {
  const name = "Your Name";
  const major = "Your Major";
  const university = "Your University";

  return (
    <div className="about">
      <h3>About Me</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Major:</strong> {major}</p>
      <p><strong>University:</strong> {university}</p>
    </div>
  );
}

export default About;
```

### Challenge 2: Add Click Interaction

Update Welcome component to show an alert when clicking a button:

```tsx
function Welcome() {
  const handleClick = () => {
    alert('Welcome to React! 🎉');
  };

  return (
    <div className="welcome">
      <h2>Welcome, Student!</h2>
      <button onClick={handleClick}>Click Me!</button>
    </div>
  );
}
```

> 💡 **Note:** This is a simple alert. Real interactivity with state updates is covered in Lesson 2.

---

## Submission Checklist

- [ ] Project runs without errors (`npm run dev`)
- [ ] Welcome component displays correctly
- [ ] Feature component shows list of features
- [ ] Footer component has working links
- [ ] All components have CSS styling applied
- [ ] Components are properly imported in App.tsx

---

## What You Learned

✅ **Project Setup:**
- Created React + TypeScript project with Vite
- Understood project folder structure
- Installed and ran development server

✅ **Components:**
- Created functional components
- Used `export default` and `import`
- Organized components in separate files

✅ **JSX Syntax:**
- Embedded JavaScript in JSX with `{}`
- Used `.map()` to render lists
- Applied `className` for styling

✅ **Styling:**
- Created CSS files for components
- Imported CSS in components
- Applied basic responsive design

✅ **Project Structure:**
- Organized code in `src/components/`
- Separated concerns (component logic vs styling)
- Built modular, maintainable application

---

## Next Steps

🎉 **Congratulations!** You've built your first React application!

**Ready for more advanced topics?** Continue to [Lab 2](../../lesson2-component-hook/lab/lab2.md) to learn:
- **Props:** Passing data between components
- **State:** Managing interactive UI with `useState`
- **Hooks:** `useEffect`, `useRef`, and custom hooks
- **Component Patterns:** Building reusable component libraries

---

## Troubleshooting

### Port 5173 already in use
```bash
# Kill process using port 5173
# Windows: Task Manager → End Node.js process
# Mac/Linux:
lsof -ti:5173 | xargs kill
```

### Module not found errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### CSS not applying
- Verify CSS file is imported in component: `import './Component.css'`
- Check `className` spelling matches CSS file
- Clear browser cache: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### TypeScript errors
- Make sure all imports have correct file paths
- Check file extensions (`.tsx` for components with JSX)
- Restart VS Code if errors persist

---

**Happy Coding! 🚀**
