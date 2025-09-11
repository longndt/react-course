# Lesson 1: Getting Started with React 🚀

## What Will You Learn? 🎯

By the end of this lesson, you will be able to:

1. Understand what React is and why it's useful
2. Set up your development tools
3. Create your first React app
4. Build simple components
5. Write React code using JSX

## Why Learn React? 🤔

- Most popular framework for building websites
- High demand in job market
- Makes coding websites easier and faster
- Great community support
- Many companies use React (Facebook, Instagram, etc.)

## Understanding React 📚

### What is React? Simple Explanation 🤓

Think of React like building with LEGO:

- Your website is made of small pieces (we call them components)
- Each piece can be used many times (like using the same LEGO brick)
- Pieces can be simple or complex (like basic and fancy LEGO pieces)
- All pieces fit together to make your website (like building a LEGO model)

### Real-World Example 🌟

Think of a social media post:

```
┌──────────────────────┐
│     User Avatar      │ <- Profile Component
│      Username        │
├──────────────────────┤
│                      │
│    Post Content      │ <- Content Component
│                      │
├──────────────────────┤
│ 👍 Like  💬 Comment  │ <- Actions Component
└──────────────────────┘
```

Each box is a component that you can reuse for different posts!

### Basic React Concepts 🔑

#### 1. Components (Like LEGO Pieces)

```jsx
// This is a simple component
function WelcomeMessage() {
  return (
    <div className="message">
      <h1>Welcome!</h1>
      <p>This is my first React component</p>
    </div>
  );
}
```

#### 2. JSX (Writing HTML in JavaScript)

```jsx
// JSX lets you write HTML-like code in JavaScript
function Greeting() {
  const name = "John"; // Regular JavaScript
  return (
    <div>
      {" "}
      {/* This looks like HTML */}
      <h1>Hello {name}!</h1>
    </div>
  );
}
```

#### 3. Props (Component Settings)

```jsx
// Props are like settings for your components
function Button({ text, color }) {
  return <button className={color}>{text}</button>;
}

// Using the Button:
<Button text="Click me!" color="blue" />;
```

## Setting Up Your Tools 🛠️

### What You Need to Install

#### 1. Node.js (The Engine)

- Go to [nodejs.org](https://nodejs.org)
- Download "LTS" version (it's more stable!)
- Install it (just click "Next" through the installer)
- Check if it works:
  ```bash
  node --version    # Should show a number like v18.0.0
  npm --version     # Should show another number
  ```

#### 2. VS Code (The Editor)

- Download from [code.visualstudio.com](https://code.visualstudio.com)
- Install these helpful extensions:
  1. ES7+ React/Redux/React-Native snippets (for code shortcuts)
  2. ESLint (finds mistakes in your code)
  3. Prettier (makes your code look nice)

#### 3. Browser Tools

- Install "React Developer Tools" for your browser
  - [Chrome Version](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
  - [Firefox Version](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

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
│   ├── App.jsx    👈 Main page
│   ├── main.jsx   👈 Starting point
│   └── index.css  👈 Main styles
├── public/        👈 Images go here
└── index.html     👈 Main HTML file
```

Remember:

- Always work in the `src` folder
- Put images in `public`
- Don't touch files you don't understand yet!

## Your First Components 🏗️

### 1. Simple Welcome Component

```jsx
// src/components/Welcome.jsx
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

```jsx
// src/components/Button.jsx
function Button({ text, color }) {
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

```jsx
// src/components/ProfileCard.jsx
function ProfileCard({ name, image, role }) {
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

## Practice Time! 💪

### Exercise 1: Setup (15 minutes)

1. Install all required tools
2. Create your first React project
3. Make it run in your browser
4. Try to understand the files

### Exercise 2: Simple Components (30 minutes)

Create these basic components:

1. Header with title
2. Button that shows an alert
3. Card with some text
4. Image with caption

Example:

```jsx
function Header() {
  return (
    <header>
      <h1>My React App</h1>
    </header>
  );
}
```

### Exercise 3: Profile Card (45 minutes)

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

```jsx
// ❌ Wrong - starts with lowercase
function button() {}

// ✅ Correct - starts with uppercase
function Button() {}
```

### 2. HTML Class vs className

```jsx
// ❌ Wrong - 'class' is not used in React
<div class="container">

// ✅ Correct - use 'className' instead
<div className="container">
```

### 3. Closing Tags

```jsx
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

Remember:

- Break it into small components
- Style each part separately
- Ask for help if needed!

## 🤔 Check Your Understanding

1. What is a React component?
2. Why do we use components?
3. What's the difference between props and regular variables?
4. How do you create a new React project?
5. What's the purpose of the public folder?
