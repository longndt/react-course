# Modern React Setup

## Lesson 1 - Introduction to Modern React Development

---

### Learning Objectives

By the end of this lesson, you will be able to:

- Set up a modern React development environment
- Understand key React 18+ features
- Create and structure React projects
- Write modern JavaScript with React

---

### Why Modern React?

- Component-Based Architecture
- Virtual DOM
- Rich Ecosystem
- Strong Community
- Modern Features (React 18+)

---

### Development Environment Setup

- Node.js (v18+)
- VS Code
- Essential Extensions
  - ESLint
  - Prettier
  - ES7+ React/Redux/React-Native snippets

---

### Project Creation Tools

#### Create React App (CRA)

```bash
npx create-react-app my-app
```

#### Vite (Recommended)

```bash
npm create vite@latest my-app -- --template react
```

---

### Project Structure Best Practices

```
src/
├── components/    # Reusable UI components
├── pages/        # Route components
├── hooks/        # Custom hooks
├── services/     # API/external services
├── utils/        # Helper functions
└── styles/       # CSS files
```

---

### React 18 Key Features

- Automatic Batching
- Transitions
- Suspense
- Concurrent Features
- New Hooks

---

### Modern JavaScript with React

```javascript
// Function Component with Props
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>Age: {age}</p>}
    </div>
  );
}

// Using modern JavaScript features
const users = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
];

function UserList() {
  return (
    <div>
      {users.map((user) => (
        <Greeting key={user.id} name={user.name} age={user.age} />
      ))}
    </div>
  );
}
```

---

### Common Patterns

- Functional Components
- Hooks
- Props & State
- Event Handling
- Component Composition

---

### Best Practices

1. Use Modern JavaScript (ES6+)
2. Follow Project Structure
3. Implement ESLint/Prettier
4. Write Clean, Readable Code
5. Use React 18+ Features

---

### Common Pitfalls

- Not using modern JavaScript features
- Poor component organization
- Ignoring ESLint warnings
- Inconsistent code formatting
- Using outdated React patterns

---

### Practical Exercise

Create a Profile Card Component:

```javascript
function ProfileCard({ name, role, bio, avatar }) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <h3>{role}</h3>
      <p>{bio}</p>
    </div>
  );
}

// Usage
function App() {
  return (
    <ProfileCard
      name="John Doe"
      role="React Developer"
      bio="Passionate about building user interfaces"
      avatar="/john-avatar.jpg"
    />
  );
}
```

---

### Additional Resources

- [React Documentation](https://react.dev)
- [Modern JavaScript Guide](https://javascript.info)
- [Vite Guide](https://vitejs.dev/guide)
- [ESLint Documentation](https://eslint.org)
