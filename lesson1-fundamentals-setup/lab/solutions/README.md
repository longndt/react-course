# Lab 1 Solutions

> ⚠️ **Lưu ý:** Chỉ xem solutions sau khi đã thử làm bài tập. Learning by doing!

---

## 📁 Solution Structure

```
exercise1-solution/          # Environment Setup
exercise2-solution/          # First Component
exercise3-solution/          # Styling
exercise4-solution/          # Landing Page
final-project-solution/      # Complete welcome page
```

---

## Exercise 1 Solution: Project Setup

### Expected Result
✅ Vite project chạy thành công tại `http://localhost:5173`

### Verification Checklist
- [ ] `npm run dev` chạy không lỗi
- [ ] Browser tự động mở
- [ ] Thấy Vite + React default page
- [ ] Hot reload works (thay đổi code → tự động refresh)

### Common Issues & Solutions

**Issue: `'npm' is not recognized`**
```bash
# Solution: Install Node.js from nodejs.org
# Verify after install:
node --version  # Should show v18+
npm --version   # Should show v9+
```

**Issue: Port 5173 already in use**
```bash
# Solution 1: Kill process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Solution 2: Use different port
npm run dev -- --port 3000
```

---

## Exercise 2 Solution: Create Your First Component

### File: `src/App.tsx`

```tsx
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to My React App</h1>
      <p>This is my first React component!</p>
    </div>
  );
}

export default App;
```

### Explanation

**What's happening:**
1. **Import CSS:** `import './App.css'` - Styles for this component
2. **Function Component:** `function App()` - Modern React component style
3. **Return JSX:** `return (<div>...</div>)` - HTML-like syntax
4. **Export:** `export default App` - Make component available to other files

**Key Concepts:**
- ✅ Components are just functions that return JSX
- ✅ One root element required (the outer `<div>`)
- ✅ Use camelCase for attributes: `className` not `class`

### Common Mistakes

❌ **Mistake 1: Multiple root elements**
```tsx
// ❌ Wrong - no wrapper
function App() {
  return (
    <h1>Title</h1>
    <p>Text</p>  // Error!
  );
}

// ✅ Correct - wrapped in div
function App() {
  return (
    <div>
      <h1>Title</h1>
      <p>Text</p>
    </div>
  );
}
```

❌ **Mistake 2: Using `class` instead of `className`**
```tsx
// ❌ Wrong
<div class="App">  // Warning!

// ✅ Correct
<div className="App">
```

---

## Exercise 3 Solution: Add Styling

### File: `src/App.css`

```css
.App {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  color: #555;
  font-size: 1.2rem;
  line-height: 1.6;
}
```

### Explanation

**CSS Concepts:**
- **`.App`** - Class selector (matches `className="App"`)
- **`margin: 0 auto`** - Center the container
- **`max-width: 800px`** - Limit width for readability
- **`rem`** - Relative font size (1rem = 16px default)

**Result:**
- Content centered on page
- Readable width (not too wide)
- Professional typography

---

## Exercise 4 Solution: Build a Simple Landing Page

### File Structure
```
src/
├── App.tsx
├── App.css
└── components/
    ├── Header.tsx
    ├── Hero.tsx
    └── Footer.tsx
```

### File: `src/components/Header.tsx`

```tsx
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>My Portfolio</h1>
      <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
```

### File: `src/components/Header.css`

```css
.header {
  background: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  color: white;
}

.header nav {
  display: flex;
  gap: 20px;
}

.header nav a {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background 0.3s;
}

.header nav a:hover {
  background: rgba(255, 255, 255, 0.1);
}
```

### File: `src/components/Hero.tsx`

```tsx
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <h2>Welcome to My Portfolio</h2>
      <p>I'm a web developer passionate about creating amazing user experiences.</p>
      <button className="cta-button">View My Work</button>
    </section>
  );
}

export default Hero;
```

### File: `src/components/Hero.css`

```css
.hero {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero h2 {
  font-size: 3rem;
  margin-bottom: 20px;
  color: white;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: white;
}

.cta-button {
  background: white;
  color: #667eea;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s;
}

.cta-button:hover {
  transform: scale(1.05);
}
```

### File: `src/components/Footer.tsx`

```tsx
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2025 My Portfolio. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
```

### File: `src/components/Footer.css`

```css
.footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: auto;
}

.footer p {
  margin: 0;
  color: white;
}
```

### File: `src/App.tsx` (Updated)

```tsx
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
```

### File: `src/App.css` (Updated)

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.App {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

---

## 🎯 Key Learning Points

### 1. Component Composition
```
App
├── Header
├── Hero
└── Footer
```

**Why?**
- Reusable pieces
- Easier to maintain
- Clear structure

### 2. Import/Export
```tsx
// Export component
export default Header;

// Import component
import Header from './components/Header';
```

### 3. Component Naming
- ✅ PascalCase: `Header`, `Hero`, `Footer`
- ✅ Descriptive names
- ✅ File name matches component name

### 4. CSS Organization
- One CSS file per component
- Scoped class names (`.header`, `.hero`, `.footer`)
- No conflicts

---

## 📸 Expected Output

### Desktop View
```
┌─────────────────────────────────┐
│  My Portfolio    About Projects │ ← Header
├─────────────────────────────────┤
│                                 │
│    Welcome to My Portfolio      │
│   I'm a web developer...        │ ← Hero
│      [View My Work]             │
│                                 │
├─────────────────────────────────┤
│  © 2025 My Portfolio            │ ← Footer
└─────────────────────────────────┘
```

---

## 🔍 Self-Check Questions

After completing this lab, can you:

1. ✅ Create a new React component?
2. ✅ Import and use a component in another component?
3. ✅ Apply CSS to components?
4. ✅ Build a multi-component page?
5. ✅ Understand component composition?

If yes to all → **Ready for Lesson 2!** 🚀

If no → Review [theory1.md](../../theory/theory1.md) or ask for help!

---

## 💡 Bonus Challenges

### Challenge 1: Add More Sections
Create `About`, `Projects`, `Contact` components

### Challenge 2: Make it Responsive
Add media queries for mobile:
```css
@media (max-width: 768px) {
  .header {
    flex-direction: column;
  }

  .hero h2 {
    font-size: 2rem;
  }
}
```

### Challenge 3: Add Images
```tsx
<img src="/profile.jpg" alt="Profile" />
```

---

## 🆘 Still Stuck?

### Resources
- [React Docs - Your First Component](https://react.dev/learn/your-first-component)
- [MDN - CSS Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
- Course Discord: Ask in #lab1-help

### Common Questions

**Q: Can I use JavaScript (.jsx) instead of TypeScript (.tsx)?**
A: For this course, we require TypeScript for better learning and industry readiness.

**Q: My styles aren't applying. Why?**
A: Check:
1. CSS file imported in component
2. className spelled correctly
3. CSS selector matches className

**Q: Do I need to understand all CSS?**
A: No! Focus on: flexbox, basic layout, colors. Advanced CSS comes with practice.

---

**Next:** [Lab 2 - Components & Hooks](../../lesson2-component-hook/lab/lab2.md)
