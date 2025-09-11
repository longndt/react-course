# Modern React Setup

## Lesson 1 - Introduction to Modern React Development

---

### Learning Objectives

By the end of this lesson, you will be able to:

- Set up a modern React development environment
- Understand key React 18+ features
- Create and structure React projects
- Write basic TypeScript in React

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
  - TypeScript support

---

### Project Creation Tools

#### Create React App (CRA)

```bash
npx create-react-app my-app --template typescript
```

#### Vite (Recommended)

```bash
npm create vite@latest my-app -- --template react-ts
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
└── types/        # TypeScript types
```

---

### React 18 Key Features

- Automatic Batching
- Transitions
- Suspense
- Concurrent Features
- New Hooks

---

### TypeScript Integration

```typescript
// Function Component
interface Props {
  name: string;
  age?: number;
}

const Greeting = ({ name, age }: Props) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>Age: {age}</p>}
    </div>
  );
};
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

1. Use TypeScript
2. Follow Project Structure
3. Implement ESLint/Prettier
4. Write Documentation
5. Use Modern Features

---

### Common Pitfalls

- Mixing JavaScript and TypeScript
- Ignoring TypeScript Errors
- Poor Project Structure
- Skipping Documentation
- Using Deprecated Features

---

### Practical Exercise

Create a Profile Card Component:

```typescript
interface Profile {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

const ProfileCard = ({ name, role, bio, avatar }: Profile) => {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <h3>{role}</h3>
      <p>{bio}</p>
    </div>
  );
};
```

---

### Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [ESLint Documentation](https://eslint.org)
