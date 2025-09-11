# Lab 1: Building Your First Professional React Application

## Overview
In this lab session, you'll create a Student Dashboard application using TypeScript and React. This project simulates the kind of interface you might build for your final year project - a management system with multiple views and data handling.

**Time Allocation:**
- Exercise 1: Project Setup (30 minutes)
- Exercise 2: TypeScript Components (45 minutes)
- Exercise 3: Interactive Dashboard (60 minutes)
- Exercise 4: Advanced Features (45 minutes)

## Pre-Lab Checklist
- [ ] Node.js v18+ installed
- [ ] VS Code with React extensions installed
- [ ] Basic understanding of JavaScript ES6+
- [ ] Familiarity with HTML/CSS

---

## Exercise 1: Professional Project Setup (30 minutes)

### Step 1: Create TypeScript React Project

```bash
# Create new project with TypeScript template
npm create vite@latest student-dashboard -- --template react-ts

# Navigate to project
cd student-dashboard

# Install dependencies
npm install

# Install additional useful libraries
npm install lucide-react  # For icons
npm install clsx          # For conditional classes

# Start development server
npm run dev
```

### Step 2: Understand Project Structure

```
student-dashboard/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles
│   └── vite-env.d.ts    # TypeScript definitions
├── public/              # Static assets
├── package.json         # Project configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite build configuration
```

### Step 3: Configure Development Environment

Add this to your `tsconfig.json` for better development experience:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

   export default App;
   ```

### Exercise 2: Creating Components (45 minutes)

1. Create a Header component:
   ```jsx
   // src/components/Header.jsx
   function Header() {
     return (
       <header className="header">
         <h1>My React App</h1>
         <nav>
           <a href="#home">Home</a>
           <a href="#about">About</a>
           <a href="#contact">Contact</a>
         </nav>
       </header>
     );
   }

   export default Header;
   ```

2. Create a Button component:
   ```jsx
   // src/components/Button.jsx
   function Button({ text, onClick }) {
     return (
       <button
         className="button"
         onClick={onClick}
       >
         {text}
       </button>
     );
   }

   export default Button;
   ```

3. Create styles:
   ```css
   /* src/styles/components.css */
   .header {
     background: #f8f9fa;
     padding: 1rem;
     margin-bottom: 2rem;
   }

   .button {
     background: #007bff;
     color: white;
     border: none;
     padding: 0.5rem 1rem;
     border-radius: 4px;
     cursor: pointer;
   }

   .button:hover {
     background: #0056b3;
   }
   ```

### Exercise 3: Adding Interactivity (45 minutes)

1. Create a Counter component:
   ```jsx
   // src/components/Counter.jsx
   import { useState } from 'react';
   import Button from './Button';

   function Counter() {
     const [count, setCount] = useState(0);

     return (
       <div className="counter">
         <h2>Counter: {count}</h2>
         <Button
           text="Increment"
           onClick={() => setCount(count + 1)}
         />
         <Button
           text="Decrement"
           onClick={() => setCount(count - 1)}
         />
       </div>
     );
   }

   export default Counter;
   ```

2. Create a UserProfile component:
   ```jsx
   // src/components/UserProfile.jsx
   function UserProfile({ name, role, imageUrl }) {
     return (
       <div className="profile">
         <img
           src={imageUrl}
           alt={name}
           className="profile-image"
         />
         <h2>{name}</h2>
         <p>{role}</p>
       </div>
     );
   }

   export default UserProfile;
   ```

3. Use components in App:
   ```jsx
   // src/App.jsx
   import Header from './components/Header';
   import Counter from './components/Counter';
   import UserProfile from './components/UserProfile';

   function App() {
     return (
       <div className="app">
         <Header />
         <main>
           <Counter />
           <UserProfile
             name="John Doe"
             role="React Developer"
             imageUrl="https://example.com/avatar.jpg"
           />
         </main>
       </div>
     );
   }

   export default App;
   ```

### Exercise 4: Styling Your App (30 minutes)

1. Create a theme file:
   ```css
   /* src/styles/theme.css */
   :root {
     --primary-color: #007bff;
     --secondary-color: #6c757d;
     --background-color: #f8f9fa;
     --text-color: #212529;
     --spacing-unit: 1rem;
   }

   body {
     margin: 0;
     font-family: -apple-system, system-ui, sans-serif;
     color: var(--text-color);
   }

   .app {
     max-width: 1200px;
     margin: 0 auto;
     padding: var(--spacing-unit);
   }
   ```

2. Add component-specific styles:
   ```css
   /* src/styles/components.css */
   .profile {
     border: 1px solid #ddd;
     padding: var(--spacing-unit);
     border-radius: 8px;
     text-align: center;
   }

   .profile-image {
     width: 100px;
     height: 100px;
     border-radius: 50%;
     margin-bottom: var(--spacing-unit);
   }

   .counter {
     background: var(--background-color);
     padding: var(--spacing-unit);
     border-radius: 8px;
     margin: var(--spacing-unit) 0;
   }
   ```

## Bonus Tasks

### 1. Add a Theme Switcher
Create a button that toggles between light and dark themes:
```jsx
function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  function toggleTheme() {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-theme');
  }

  return (
    <Button
      text={isDark ? "Light Mode" : "Dark Mode"}
      onClick={toggleTheme}
    />
  );
}
```

### 2. Create a Todo List
Implement a simple todo list with add/remove functionality:
```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  function addTodo() {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  }

  return (
    <div className="todo-list">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo"
      />
      <Button text="Add" onClick={addTodo} />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Submission Requirements

1. Create a GitHub repository for your project
2. Your repository should include:
   - All source code
   - README.md with setup instructions
   - Screenshots of your running application
   - Bonus features (if implemented)

3. Your project should:
   - Run without errors
   - Include all required components
   - Show proper use of React concepts
   - Have consistent styling
   - Include comments explaining key concepts

## Grading Criteria

- Project Setup & Structure (20%)
- Component Implementation (30%)
- Styling & Design (20%)
- Code Quality & Best Practices (20%)
- Documentation & Comments (10%)

## Additional Resources
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [React DevTools](https://react.dev/learn/react-developer-tools)
