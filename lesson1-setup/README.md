# Lesson 1: Getting Started with React

## Overview
In this lesson, you'll learn the fundamentals of React and set up your development environment. We'll start from absolute basics and progress to building your first React components.

## Learning Objectives
After this lesson, you will be able to:
- Understand what React is and why it's useful
- Set up a React development environment
- Create and run your first React application
- Build basic React components
- Use JSX to create user interfaces

## 1. Understanding React Basics

### What is React?
React is a JavaScript library for building user interfaces. Think of it like building with LEGO:
- Components are like LEGO blocks
- You can reuse them anywhere
- They can be simple or complex
- They fit together to build complete applications

### Why React?
1. Easy to Learn
   - Uses familiar JavaScript
   - Simple and clear syntax
   - Great documentation

2. Component-Based
   - Break UI into small pieces
   - Reuse components
   - Easier maintenance

3. Large Ecosystem
   - Many ready-to-use components
   - Strong community support
   - Lots of learning resources

### Key Concepts
1. Components
   ```jsx
   // A simple component
   function Welcome() {
     return <h1>Hello, React!</h1>;
   }
   ```

2. JSX
   ```jsx
   // JSX combines HTML and JavaScript
   function Greeting({ name }) {
     return (
       <div className="greeting">
         Hello, {name}!
       </div>
     );
   }
   ```

3. Props
   ```jsx
   // Passing data to components
   function UserCard({ name, role }) {
     return (
       <div className="card">
         <h2>{name}</h2>
         <p>{role}</p>
       </div>
     );
   }
   ```

## 2. Setting Up Your Environment

### Required Tools
1. Install Node.js
   - Download from [nodejs.org](https://nodejs.org)
   - Choose LTS version (18 or higher)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. Install VS Code
   - Download from [code.visualstudio.com](https://code.visualstudio.com)
   - Install extensions:
     - ES7+ React/Redux/React-Native snippets
     - ESLint
     - Prettier

3. Install Browser Extensions
   - React Developer Tools
   - Redux DevTools (for later use)

## 3. Creating Your First React App

### Using Vite (Recommended)
```bash
# Create new project
npm create vite@latest my-first-react-app -- --template react
cd my-first-react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure
```
my-first-react-app/
├── node_modules/     # Dependencies
├── public/          # Static files
├── src/             # Source code
│   ├── App.jsx      # Main component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles
├── index.html       # HTML template
├── package.json     # Project config
└── vite.config.js   # Vite config
```

## 4. Building Your First Components

### 1. Simple Component
```jsx
// src/components/Welcome.jsx
function Welcome() {
  return (
    <div className="welcome">
      <h1>Welcome to React</h1>
      <p>Let's build something awesome!</p>
    </div>
  );
}

export default Welcome;
```

### 2. Component with Props
```jsx
// src/components/UserProfile.jsx
function UserProfile({ name, email, role }) {
  return (
    <div className="user-profile">
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
    </div>
  );
}

export default UserProfile;
```

### 3. Using Components
```jsx
// src/App.jsx
import Welcome from './components/Welcome';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div>
      <Welcome />
      <UserProfile
        name="John Doe"
        email="john@example.com"
        role="Developer"
      />
    </div>
  );
}

export default App;
```

## Lab Exercises

### Exercise 1: Environment Setup (15 minutes)
1. Install required tools
2. Create a new React project
3. Start the development server
4. Explore the project structure

### Exercise 2: Basic Components (30 minutes)
1. Create a Header component
2. Create a Footer component
3. Add them to App.jsx
4. Style your components

### Exercise 3: Profile Card (45 minutes)
Create a profile card component that:
1. Accepts props for:
   - Name
   - Image
   - Title
   - Description
2. Has proper styling
3. Is reusable
4. Handles missing data gracefully

## Additional Resources
- [React Official Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Homework
1. Create a personal portfolio page using React
2. Include:
   - Header with navigation
   - About section
   - Skills section
   - Project list
   - Contact form
3. Use components for each section
4. Add basic styling
