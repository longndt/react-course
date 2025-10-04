# Lesson 1: React Fundamentals & TypeScript Setup

## Overview

This lesson introduces React fundamentals with a focus on modern development practices. We'll set up a professional development environment, understand React's core concepts, and build components with TypeScript from day one.

## Learning Objectives

By the end of this lesson, you will be able to:

- Understand React's component-based architecture and virtual DOM
- Set up a modern React development environment with TypeScript
- Create functional components using hooks
- Manage component state and handle events
- Build reusable component patterns
- Apply modern JavaScript/TypeScript features in React

## Prerequisites

- Solid understanding of HTML, CSS, and JavaScript (ES6+)
- Experience with modern JavaScript features (destructuring, modules, async/await)
- Basic familiarity with command line operations
- Understanding of programming fundamentals and web technologies (DOM, events, HTTP)

**📚 Need a refresher?** Complete [Lesson 0: JavaScript ES6+ Review](../lesson0-prerequisites/) first.

## Understanding React

### React's Core Philosophy

React is a declarative, component-based library for building user interfaces. Unlike imperative DOM manipulation, React uses:

- **Virtual DOM**: Efficient diffing and reconciliation
- **Component-Based Architecture**: Encapsulated, reusable UI pieces
- **Unidirectional Data Flow**: Predictable state management
- **Declarative Programming**: Describe what the UI should look like

### React vs Other Approaches

```typescript
// Traditional DOM manipulation
const button = document.getElementById("myButton");
button.addEventListener("click", function () {
  const counter = document.getElementById("counter");
  counter.textContent = parseInt(counter.textContent) + 1;
});

// React approach
function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Modern React with TypeScript

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user)}>Edit User</button>
    </div>
  );
};
```

## Prerequisites Check ✅

Before diving into React concepts, ensure your development environment is properly set up:

> 📋 **Important**: Complete the [Comprehensive Environment Setup Guide](../setup/environment-setup.md) first if you haven't already. It provides detailed instructions for installing Node\.ts, VS Code, Git, and all necessary development tools.

**Quick Verification:**

```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show v9.0.0 or higher
git --version     # Should show installed version
code --version    # Should show VS Code version
```

**Required Extensions in VS Code:**

- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier
- React Developer Tools (browser extension)

## Creating Your First React App 🎉

### Step-by-Step Guide

#### 1. Create New Project

Open terminal (Command Prompt on Windows) and type:

```bash
npm create vite@latest my-first-app -- --template react
```

This creates a new folder called "my-first-app"

#### 2. Go to Project Folder

```bash
cd my-first-app
```

#### 3. Install Required Files

```bash
npm install
```

Wait until you see a green checkmark ✅

#### 4. Start the Project

```bash
npm run dev
```

You'll see a link (like http://localhost:5173) - hold Ctrl (Windows) or Cmd (Mac) and click it!

### Understanding Your Project Files 📁

```
my-first-app/
├── src/           👈 Your code goes here!
│   ├── App\.tsx    👈 Main page
│   ├── main\.tsx   👈 Starting point
│   └── index.css  👈 Main styles
├── public/        👈 Images go here
└── index.html     👈 Main HTML file
```

Remember:

- Always work in the `src` folder
- Put images in `public`
- Don't touch files you don't understand yet!

## 🔍 **Knowledge Checkpoint 1**

Before moving on, make sure you can answer:

1. **What is the difference between `src` and `public` folders?**
2. **What does the `export default` statement do?**
3. **Why do we use `\.tsx` file extensions?**

_💡 Tip: If you're unsure about any answer, review the section above before continuing._

---

## Your First Components 🏗️

### 1. Simple Welcome Component

```tsx
// src/components/Welcome\.tsx
function Welcome() {
  return (
    <div className="welcome">
      <h1>Hello React!</h1>
      <p>This is my first component</p>
    </div>
  );
}

export default Welcome; // Makes component available to other files
```

### 2. Button Component with Props

```tsx
// src/components/Button.tsx
interface ButtonProps {
  text: string;
  color: string;
}

function Button({ text, color }: ButtonProps) {
  return (
    <button className={`button ${color}`}>
      {text}
    </button>
  );
}

export default Button;

// Using the Button:
<Button text="Click me!" color="blue" />
<Button text="Delete" color="red" />
```

### 3. Profile Card Component

```tsx
// src/components/ProfileCard.tsx
interface ProfileCardProps {
  name: string;
  image: string;
  role: string;
}

function ProfileCard({ name, image, role }: ProfileCardProps) {
  return (
    <div className="profile-card">
      <img src={image} alt={name} className="profile-image" />
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}

export default ProfileCard;

// Using ProfileCard:
<ProfileCard name="John Doe" image="/john.jpg" role="React Developer" />;
```

### 4. Styling Your Components

```css
/* src/styles/components.css */
.profile-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.blue {
  background: #007bff;
  color: white;
}

.red {
  background: #dc3545;
  color: white;
}
```

## 🔍 **Knowledge Checkpoint 2**

Test your understanding of React components:

1. **How do you pass data to a component?**
2. **What is the syntax for using JavaScript expressions in JSX?**
3. **How do you apply CSS classes to React elements?**

_💡 Review the component examples above if you need help._

---

## Practice Time! 💪

### Exercise 1: Setup

1. Install all required tools
2. Create your first React project
3. Make it run in your browser
4. Try to understand the files

### Exercise 2: Simple Components

Create these basic components:

1. Header with title
2. Button that shows an alert
3. Card with some text
4. Image with caption

Example:

```tsx
function Header() {
  return (
    <header>
      <h1>My React App</h1>
    </header>
  );
}
```

### Exercise 3: Profile Card

Create a nice profile card that shows:

- Your photo
- Your name
- Your hobbies
- Favorite quote

Bonus:

- Add nice styles
- Make it colorful
- Add hover effects

## 🚫 Common Mistakes to Avoid

### 1. Component Names

```tsx
// ❌ Wrong - starts with lowercase
function button() {}

// ✅ Correct - starts with uppercase
function Button() {}
```

### 2. HTML Class vs className

```tsx
// ❌ Wrong - 'class' is not used in React
<div class="container">

// ✅ Correct - use 'className' instead
<div className="container">
```

### 3. Closing Tags

```tsx
// ❌ Wrong - tag not closed
<img src="photo.jpg">

// ✅ Correct - proper closing
<img src="photo.jpg" />
```

## 📚 Extra Help

### Good Resources for Beginners

1. [React Beginner's Guide](https://react.dev/learn)
2. [Free React Course on YouTube](https://www.youtube.com/watch?v=SqcY0GlETPk)
3. [React Examples](https://reactjsexample.com/)

### When You're Stuck

1. Check the error message carefully
2. Google the error message
3. Ask on [Stack Overflow](https://stackoverflow.com)
4. Ask your teacher!

## 🏠 Homework

Create a simple personal website using React:

1. Header with your name
2. About Me section
3. Your skills list
4. Contact information

## 📊 **Final Knowledge Assessment**

Complete this self-assessment to check your understanding:

### **Basic Concepts (Must Know)**

- [ ] I can explain what React is and why it's useful
- [ ] I understand the difference between components and regular functions
- [ ] I can create a simple React component with JSX
- [ ] I know how to pass props to components
- [ ] I understand the difference between `class` and `className`

### **Setup & Tools (Must Know)**

- [ ] I can create a new React project with Vite
- [ ] I know how to start the development server
- [ ] I understand the basic folder structure
- [ ] I can import and export components

### **TypeScript Basics (Good to Know)**

- [ ] I understand why TypeScript is helpful
- [ ] I can define basic interfaces for props
- [ ] I know how to type React components

### **Practical Skills (Must Demonstrate)**

- [ ] I built and ran my first React application
- [ ] I created multiple reusable components
- [ ] I applied CSS styling to components
- [ ] I can troubleshoot basic React errors

**🎯 Goal: Check at least 10/13 items before moving to Lesson 2**

### **Self-Reflection Questions**

1. What was the most challenging concept to understand?
2. Which part felt most similar to previous programming experience?
3. What would you like to build with React in future projects?

---

## 🎓 **Ready for Lesson 2?**

If you completed the assessment above and feel comfortable with React basics, you're ready to move on to [Lesson 2: Component Architecture & Advanced State](../lesson2-component-hook/).

**Still need practice?** That's totally normal! Consider:

- Reviewing the sections you found challenging
- Completing the homework assignment
- Building additional simple components
- Asking questions in class or during office hoursRemember:

- Break it into small components
- Style each part separately
- Ask for help if needed!

## 🤔 Check Your Understanding

1. What is a React component?
2. Why do we use components?
3. What's the difference between props and regular variables?
4. How do you create a new React project?
5. What's the purpose of the public folder?


