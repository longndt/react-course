# React Course - LongNDT

## Course Overview

This course teaches React app development with industry-standard practices through hands-on examples.

**Audience**: IT students and developers looking to master React

**Format**: Theory, hands-on practice, and project-based learning

## Prerequisites

- HTML, CSS, and JavaScript fundamentals
- Basic programming concepts (variables, functions, loops, objects)
- Command line operations
- Experience with at least one backend technology
- Basic understanding of databases and APIs

## What You'll Learn

- Build modern React applications with functional components and hooks
- Create reusable component architectures
- Manage application state with multiple patterns
- Implement client-side routing with authentication
- Handle forms, validation, and user interactions
- Integrate React frontends with REST APIs
- Implement JWT-based authentication
- Build real-time features with WebSockets
- Use modern development tools (Git, ESLint, TypeScript)
- Write tests for React components
- Deploy applications to production

## Course Structure

### Lesson 0: Prerequisites & JavaScript ES6+ Refresher (Optional)
- Modern JavaScript features essential for React
- [Go to Prerequisites Review](./lesson0-prerequisites)

### Lesson 1: React Fundamentals & TypeScript Setup
- Setting up development environment
- Component-based architecture and JSX
- **Lab Project**: Create a component library with TypeScript
- [Go to Lesson 1](./lesson1-setup)

### Lesson 2: Component Architecture & Advanced State
- Advanced component patterns and composition
- State management (useState, useReducer, Context API)
- Custom hooks and form handling
- **Lab Project**: Build a data management interface with CRUD operations
- [Go to Lesson 2](./lesson2-component-hook)

### Lesson 3: API Integration & Data Management
- Connecting React to Node.js/Express/MongoDB backends
- RESTful API consumption and error handling
- **Lab Project**: CRUD application with API integration
- [Go to Lesson 3](./lesson3-data)

### Lesson 4: Routing, Authentication & Advanced Patterns
- React Router and JWT authentication
- Protected routes and advanced React patterns
- **Lab Project**: Authentication system with protected routes
- [Go to Lesson 4](./lesson4-routing-auth)

### Lesson 5: Full-Stack Integration & Production Deployment
- Full-stack architecture with MERN stack
- File uploads, WebSockets, and deployment
- **Lab Project**: Complete application deployment
- [Go to Lesson 5](./lesson5-fullstack)

## Additional Resources

- [**Advanced State Management Guide**](./extras/state-management-guide.md) - Context API, Zustand, Redux patterns
- [**Testing Guide**](./extras/testing-guide.md) - Unit, integration, and e2e testing
- [**Modern React Stack 2025**](./extras/modern-stack-2025.md) - Latest tools and technologies
- [**Troubleshooting Guide**](./extras/troubleshooting-guide.md) - Common issues and solutions
- [**Advanced React Patterns**](./extras/advanced-patterns.md) - Enterprise-level patterns
- [**Project Templates**](./extras/project-templates.md) - Ready-to-use project structures

## 🚀 Getting Started

### Step 1: Check and Install Development Environment

**📋 First, ensure you have all required software installed:**

👉 **[Go to Environment Setup Guide](./setup/environment-setup.md)**

Make sure you have installed:
- Node.js (version 18 or higher)
- Visual Studio Code
- Git
- Required VS Code extensions

### Step 2: Install Markdown Reading Support Extension

**📖 For the best documentation reading experience:**

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search and install: **"Markdown Preview Enhanced"**
4. After installation, you can:
   - Press `Ctrl+Shift+V` to open markdown preview
   - Or click the "Open Preview to the Side" icon when viewing .md files

### Step 3: Clone Repository

```bash
git clone https://github.com/longndt/react-course
cd react-course
```

### Step 4: Recommended Learning Path

**🎯 Follow this exact order for the best learning experience:**

#### 1️⃣ **Start with Prerequisites** (If needed)
👉 **[Lesson 0: Essential JavaScript ES6+ Knowledge](./lesson0-prerequisites/readme.md)**
- Review modern JavaScript features
- Master concepts that will be used in React

#### 2️⃣ **Learn Lessons 1-5** (In sequence)
- 👉 **[Lesson 1: React Fundamentals & TypeScript Setup](./lesson1-setup/readme.md)**
- 👉 **[Lesson 2: Component Architecture & Advanced State](./lesson2-component-hook/readme.md)**
- 👉 **[Lesson 3: API Integration & Data Management](./lesson3-data/readme.md)**
- 👉 **[Lesson 4: Routing, Authentication & Advanced Patterns](./lesson4-routing-auth/readme.md)**
- 👉 **[Lesson 5: Full-Stack Integration & Production Deployment](./lesson5-fullstack/readme.md)**

#### 3️⃣ **Advanced Materials** (After completing core lessons)
📚 **The `extras/` folder contains advanced documentation:**
- **[State Management Guide](./extras/state-management-guide.md)** - Advanced state management
- **[Testing Guide](./extras/testing-guide.md)** - Testing strategies
- **[Modern React Stack 2025](./extras/modern-stack-2025.md)** - Latest technologies
- **[Advanced React Patterns](./extras/advanced-patterns.md)** - Enterprise-level patterns
- **[Project Templates](./extras/project-templates.md)** - Ready-to-use project templates
- **[Troubleshooting Guide](./extras/troubleshooting-guide.md)** - Common issues and solutions

### Step 5: Start Learning

```bash
# Start with Lesson 0 (if you need to review fundamentals)
cd lesson0-prerequisites

# Or start directly with Lesson 1
cd lesson1-setup
npm install
npm run dev
```

### 💡 Learning Tips

- **Read the readme.md** of each lesson carefully before starting
- **Complete all labs** to solidify your understanding
- **Use Markdown Preview Enhanced** for better documentation reading experience
- **Refer to the extras section** when you want to dive deeper
- **Follow the "demo" folder** to see complete examples

---

## 📚 How to Study Each Lesson (Recommended Workflow)

**Each lesson typically contains 3 key documents + demo code. Follow this optimal learning path:**

### 📖 Step 1: Read `readme.md` (10-15 minutes)
**Purpose:** Get the big picture and overview

```bash
# Open the lesson folder
cd lessonX-topic/
code readme.md  # Or use Markdown Preview (Ctrl+Shift+V)
```

**What to do:**
- ✅ Read the **Overview** section to understand the lesson goal
- ✅ Check **Learning Objectives** - what you'll master
- ✅ Skim **Quick Examples** to see what code looks like
- ✅ Review **Self-Assessment Checklist** - these are your targets
- ⏭️ **Don't spend too much time** - this is just an overview!

**Result:** You now know WHAT you'll learn and WHY it matters.

---

### 💻 Step 2: Follow `quickstart.md` (30-45 minutes)
**Purpose:** Learn by DOING - hands-on practice

```bash
code quickstart.md
```

**What to do:**
- ✅ **Type every line of code yourself** (don't copy-paste!)
- ✅ Run the code after each section
- ✅ Experiment: change values, break things, fix them
- ✅ Compare your code with the `demo/` folder if stuck
- ✅ Make notes of confusing parts

**Result:** You've built something working and understand the basics.

---

### 📘 Step 3: Study `theory/theoryX.md` (As Reference)
**Purpose:** Deep dive when you need detailed explanations

```bash
cd theory/
code theoryX.md
```

**When to use:**
- ❓ When quickstart didn't make sense
- ❓ When you need to understand "why" something works
- ❓ Before exams or interviews
- ❓ When building your own projects

**What to do:**
- ✅ Use it as a **reference book** - don't read cover-to-cover
- ✅ Search (Ctrl+F) for specific topics you're confused about
- ✅ Read the "Best Practices" and "Common Mistakes" sections
- ✅ Bookmark important sections for later review

**Result:** You have deep knowledge and can explain concepts clearly.

---

### 🔬 Step 4: Complete `lab/labX.md` (1-2 hours)
**Purpose:** Apply knowledge to build real projects

```bash
cd lab/
code labX.md
```

**What to do:**
- ✅ Read requirements carefully
- ✅ Try to build WITHOUT looking at solutions first
- ✅ Use readme/quickstart/theory as references
- ✅ Compare with demo code AFTER you finish
- ✅ Refactor your code to match best practices

**Result:** You can build similar projects independently.

---

### 🚀 Step 5: Explore `demo/` Folder (Ongoing)
**Purpose:** See production-quality code examples

```bash
cd demo/
npm install
npm run dev
```

**What to do:**
- ✅ Run the demo application
- ✅ Read the source code to see best practices
- ✅ Compare with your lab code
- ✅ Use as a template for your projects

**Result:** You understand professional code structure.

---

## ⏱️ Time Management Per Lesson

| Activity | Time | Priority |
|----------|------|----------|
| **readme.md** (Overview) | 10-15 min | 🔴 Must Do |
| **quickstart.md** (Hands-on) | 30-45 min | 🔴 Must Do |
| **Lab Exercise** | 1-2 hours | 🔴 Must Do |
| **theory.md** (Deep Dive) | As needed | 🟡 Reference |
| **demo/** (Explore) | 15-30 min | 🟡 Recommended |

**Total per lesson:** ~2-3 hours (core materials)

---

## 🎯 Study Strategies by Learning Style

### 🧪 **Hands-On Learners** (Learn by Doing)
```
quickstart.md → Lab → readme.md → theory.md (if needed)
```
**Focus:** Code first, understand later

### 📖 **Theory Learners** (Learn by Reading)
```
readme.md → theory.md → quickstart.md → Lab
```
**Focus:** Understand concepts before coding

### ⚡ **Fast Learners** (Skip Basics)
```
readme.md → Lab → (Use quickstart/theory only when stuck)
```
**Focus:** Learn from challenges

### 🐌 **Thorough Learners** (Master Everything)
```
readme.md → theory.md → quickstart.md → Lab → demo/ → Repeat
```
**Focus:** Complete mastery

---

## ❌ Common Mistakes to Avoid

1. ❌ **Reading everything but not coding**
   - ✅ Do: Code along with quickstart, type everything yourself

2. ❌ **Copy-pasting code without understanding**
   - ✅ Do: Type manually, experiment with changes

3. ❌ **Skipping the lab exercises**
   - ✅ Do: Labs are where real learning happens

4. ❌ **Not using demo code as reference**
   - ✅ Do: Compare your code with demo to learn best practices

5. ❌ **Reading theory.md like a novel (cover to cover)**
   - ✅ Do: Use it as a reference/dictionary when needed

6. ❌ **Moving to next lesson with incomplete understanding**
   - ✅ Do: Complete lab successfully before advancing

---

## 🆘 When You Get Stuck

**Follow this troubleshooting sequence:**

1. **Re-read the quickstart section** you're stuck on
2. **Check theory.md** for detailed explanation
3. **Compare with demo code** in the demo/ folder
4. **Search error messages** on Google/Stack Overflow
5. **Review the [Troubleshooting Guide](./extras/troubleshooting-guide.md)**
6. **Ask your instructor** or classmates

---

## Development Tools

### Required Software
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

### Essential VS Code Extensions
- **ES7+ React/Redux/React-Native snippets** - Code snippets for React
- **ESLint** - Code error checking
- **Prettier** - Automatic code formatting
- **JavaScript and TypeScript Nightly** - JS/TS support
- **Markdown Preview Enhanced** - Enhanced markdown reading (Highly recommended!)

### Browser Extensions
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools)
