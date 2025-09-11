# Lesson 4: Working with Data in React 📊

## What Will You Learn? 🎯

In this lesson, you'll learn how to:

1. Get data from the internet (APIs)
2. Show loading states while waiting
3. Handle errors when things go wrong
4. Save and update data in your app

## Why Do We Need This? 🤔

Think of a social media app:

- Get posts from server
- Show "Loading..." while waiting
- Show error if something fails
- Update likes when clicked

Real World Example:

```
📱 Instagram Post
┌──────────────────┐
│ Loading...       │ ← Loading State
└──────────────────┘

┌──────────────────┐
│ ❌ Error!        │ ← Error State
│ Try again...     │
└──────────────────┘

┌──────────────────┐
│ 🖼️ Post Image    │ ← Success State
│ ❤️ 100 Likes     │
└──────────────────┘
```

---

## Getting Data from the Internet 🌐

### Basic Data Fetching

```jsx
function ProductList() {
  // Store our data, loading and error states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get data when component loads
  useEffect(() => {
    // Start loading
    setLoading(true);

    // Get data from API
    fetch("https://api.example.com/products")
      .then((response) => response.json())
      .then((data) => {
        // Save data
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        // Save error
        setError("Could not load products");
        setLoading(false);
      });
  }, []); // Empty array means run once when component loads

  // Show loading message
  if (loading) {
    return <div>Loading products...</div>;
  }

  // Show error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Show products
  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### Making it Look Nice

```css
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

.product-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

/* Loading animation */
@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

.loading {
  animation: pulse 1.5s infinite;
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
```

---

## Handling Forms and User Input 📝

### Contact Form Example

```jsx
function ContactForm() {
  // Store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Store submission status
  const [status, setStatus] = useState("idle"); // idle/submitting/success/error

  // Update form data when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start submitting
    setStatus("submitting");

    try {
      // Send data to server
      const response = await fetch("https://api.example.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Success!
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      // Handle error
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="success">Message sent successfully!</p>
      )}

      {status === "error" && (
        <p className="error">Failed to send message. Please try again.</p>
      )}
    </form>
  );
}
```

---

## Common Mistakes to Avoid ⚠️

### 1. Forgetting Loading States

```jsx
// ❌ Bad - No loading state
function ProductList() {
  const [products, setProducts] = useState([]);

  // User sees nothing while loading!
  return (
    <div>
      {products.map((product) => (
        <div>{product.name}</div>
      ))}
    </div>
  );
}

// ✅ Good - With loading state
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <div>{product.name}</div>
      ))}
    </div>
  );
}
```

### 2. Not Handling Errors

```jsx
// ❌ Bad - No error handling
fetch("/api/data").then((res) => {
  // What if this fails?
  setData(res.data);
});

// ✅ Good - With error handling
fetch("/api/data")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to load");
    }
    return res.json();
  })
  .then((data) => {
    setData(data);
  })
  .catch((error) => {
    setError(error.message);
  });
```

## Practice Time! 💪

### Exercise: Todo List with API

Create a todo list that:

1. Loads todos from API
2. Shows loading state
3. Handles errors
4. Can add/delete todos

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState("");

  // Load todos when component mounts
  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  }

  // Rest of the component...
}
```

## Need Help? 🆘

### Common Problems:

1. Data not loading?

   - Check API URL
   - Verify fetch code
   - Look for console errors

2. Form not submitting?
   - Check preventDefault()
   - Verify form data
   - Check API response

### Useful Resources:

- [Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React Forms Guide](https://react.dev/reference/react-dom/components/form)
- Ask your teacher!

## Homework 📝

### Create a Blog App

Build a simple blog with:

1. List of posts (from API)
2. Add new post form
3. Delete post button
4. Loading states
5. Error handling

Tips:

- Start with displaying posts
- Add loading states
- Handle errors
- Then add forms
- Test everything thoroughly!
