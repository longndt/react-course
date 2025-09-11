# Quick Start Guide - Lesson 1

## Setup Your First React App

### 1. Prerequisites Check

```bash
# Make sure you have Node.js installed
node --version  # Should show v18 or higher
npm --version   # Should show v9 or higher
```

### 2. Create New Project

```bash
# Create project with Vite (recommended)
npm create vite@latest my-first-react-app -- --template react

# Navigate to project
cd my-first-react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Your First Component

Replace `src/App.jsx` with:

```javascript
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>My First React App</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;
```

### 4. Add Your Profile Component

Create `src/components/Profile.jsx`:

```javascript
function Profile({ name, role, hobby }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        margin: "20px",
        borderRadius: "8px",
      }}
    >
      <h2>{name}</h2>
      <p>
        <strong>Role:</strong> {role}
      </p>
      <p>
        <strong>Hobby:</strong> {hobby}
      </p>
    </div>
  );
}

export default Profile;
```

### 5. Use Profile in App

Update `src/App.jsx`:

```javascript
import { useState } from "react";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>My First React App</h1>

      <Profile name="Your Name" role="React Student" hobby="Learning React" />

      <div className="card">
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
      </div>
    </div>
  );
}

export default App;
```

## 🎉 Congratulations!

You now have:

- ✅ A working React application
- ✅ Your first custom component
- ✅ Interactive state with hooks
- ✅ Component props

## Next Steps

1. Read the full [Lesson 1 README](./README.md)
2. Complete the lab exercises
3. Try the homework project

## Need Help?

- Check the demo code in `./demo/` folder
- Review common mistakes in the README
- Ask your instructor!
