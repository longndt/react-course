# Lesson 2: React Components & State 🎨

## What Will You Learn? 🎯

After this lesson, you will:

- Understand React components better
- Learn about state (memory in React)
- Build interactive components
- Create forms in React
- Make components work together

---

## Why Components? 🤔

Think of components like building blocks:

- Each block has its own job
- Blocks can be reused
- Blocks can be changed easily
- Blocks work together

Real-World Example:

```
Facebook Post 👇
┌─────────────────┐
│    UserInfo     │ ← Component 1
├─────────────────┤
│    PostImage    │ ← Component 2
├─────────────────┤
│ LikeShareButton │ ← Component 3
└─────────────────┘
```

---

## Understanding State 🧠

### What is State?

State is like a component's memory:

- It remembers things (like numbers, text, etc.)
- It can change over time
- When it changes, the component updates

### Simple Example:

```jsx
function Counter() {
  // count is the memory (state)
  // setCount is how we change it
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Add One</button>
    </div>
  );
}
```

### When to Use State?

Use state when something needs to change:

- Counter numbers
- Form inputs
- Toggle switches
- Lists that change
- User preferences

````

---

## Working with Forms 📝

### Simple Form Example:
```jsx
function SignupForm() {
  // Store form data in state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    alert(`Hello ${name}!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name Input */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Email Input */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}
````

### Form Styling:

```css
form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
```

---

## Making Components Work Together 🤝

### Passing Data Between Components:

```jsx
// Parent Component
function Parent() {
  const [score, setScore] = useState(0);

  return (
    <div>
      <h1>Game Score: {score}</h1>

      {/* Pass score to child */}
      <ScoreDisplay score={score} />

      {/* Pass function to child */}
      <ScoreButtons onScore={setScore} />
    </div>
  );
}

// Child Components
function ScoreDisplay({ score }) {
  return <div className="score">Points: {score}</div>;
}

function ScoreButtons({ onScore }) {
  return (
    <div>
      <button onClick={() => onScore((prev) => prev + 1)}>Add Point</button>
      <button onClick={() => onScore((prev) => prev - 1)}>Remove Point</button>
    </div>
  );
}
```

## Common Mistakes to Avoid ⚠️

### 1. Changing State Directly

```jsx
// ❌ Wrong
const [score, setScore] = useState(0);
score = 10; // Don't do this!

// ✅ Correct
setScore(10);
```

### 2. Forgetting State Updates Are Async

```jsx
// ❌ Wrong
setCount(count + 1);
setCount(count + 1); // Won't work as expected

// ✅ Correct
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

### 3. Complex State Updates

````jsx
// ❌ Wrong - too complex
const [user, setUser] = useState({
  name: 'John',
  scores: [1, 2, 3],
  settings: { theme: 'dark' }
});

// ✅ Better - split into smaller states
const [name, setName] = useState('John');
const [scores, setScores] = useState([1, 2, 3]);
const [theme, setTheme] = useState('dark');

---

## Practice Time! 💪

### Exercise 1: Todo List App
Create a simple todo list:
1. Add new todos
2. Mark todos as complete
3. Delete todos

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        text: input,
        done: false
      }]);
      setInput(''); // Clear input
    }
  };

  return (
    <div className="todo-app">
      {/* Add Todo Form */}
      <div className="add-todo">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => {
                const newTodos = [...todos];
                newTodos[index].done = !todo.done;
                setTodos(newTodos);
              }}
            />
            <span style={{
              textDecoration: todo.done ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
````

### Exercise 2: Theme Switcher

Create a button that switches between light and dark theme:

```jsx
function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? "dark" : "light"}>
      <h1>My App</h1>
      <button onClick={() => setIsDark(!isDark)}>
        Switch to {isDark ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}
```

## Need Help? 🆘

### Common Problems:

1. Component not updating?

   - Check if you're using setState
   - Make sure props are passed correctly
   - Check for typos in prop names

2. Form not working?

   - Add event.preventDefault()
   - Check your onChange handlers
   - Verify state updates

3. List items not showing?
   - Make sure to add 'key' prop
   - Check if array is empty
   - Verify map function

### Where to Get Help:

- [React Documentation](https://react.dev/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)
- Ask your teacher!

## Homework 📝

### Create a Mini Shopping Cart

Build a simple shopping cart with:

1. Product list
2. Add to cart button
3. Cart total
4. Remove from cart

Tips:

- Start small
- Test each feature
- Style it nicely
- Ask for help when stuck!
