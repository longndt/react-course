# React Course - LongNDT

---

## Course Overview

This course teaches **React with JavaScript** development using industry-standard practices through hands-on examples.

**Format**: Theory, hands-on practice, and project-based learning

---

## Prerequisites

- HTML and CSS fundamentals
- JavaScript ES6+ (arrow functions, destructuring, modules, async/await)
- Basic programming concepts (variables, functions, loops, objects)
- Command line operations
- **Optional but helpful**: Basic understanding of HTTP and APIs (will be taught in Lesson 3)
- **Optional but helpful**: Familiarity with backend concepts (covered in Lessons 3-5)

---

## What You Will Learn ?

- Build modern React applications with **JavaScript** and functional components
- Understand React fundamentals and component-based architecture
- Master JSX syntax for UI components
- Create reusable component libraries with props
- Manage application state with multiple patterns
- Implement client-side routing with authentication
- Handle forms, validation, and user interactions
- Integrate React frontend with REST APIs
- Implement JWT-based authentication
- Build real-time features with WebSockets
- Use modern development tools (Vite, npm)
- Write tests for React components
- Deploy applications to production

---

## Course Structure

### Lesson 0: JavaScript Prerequisites
- JavaScript ES6+ essentials for React development
- Arrow functions, destructuring, modules, and async/await
- **Lab Project**: JavaScript practical exercises

### Lesson 1: React Fundamentals & Project Setup
- Setting up development environment with Vite
- Understanding React basics and JSX syntax
- Creating your first functional components
- Basic styling and project structure
- **Lab Project**: Build a simple welcome page with components

### Lesson 2: Component Architecture & React Hook
- Component composition and props
- State management with JavaScript
- Custom hooks and advanced patterns
- Form handling and validation
- Building reusable component libraries
- **Lab Project**: Build a data management interface with CRUD operations

### Lesson 3: API Integration & Data Management
- Connecting React to Node.js/Express backend & MongoDB database
- RESTful API consumption and error handling
- **Lab Project**: CRUD application with API integration

### Lesson 4: Routing & Authentication
- React Router and JWT authentication
- Protected routes and advanced React patterns
- **Lab Project**: Authentication system with protected routes

### Lesson 5: Full-Stack Integration & Production Deployment
- Full-stack architecture with MERN stack
- File uploads, WebSockets, and deployment
- **Lab Project**: Complete application deployment

---

## 📁 Lesson Structure

Each lesson follows a standardized structure designed for effective learning:

```
lesson-topic/
├──  reference/          # Quick reference codes
├──  example/            # Working code examples
├──  theory/             # Comprehensive documentation
├──  lab/                # Hands-on exercises
└──  quiz/               # Knowledge assessment
```

**How to run quizzes**: Use **Live Server** extension in VS Code
- Right-click quiz file → "Open with Live Server"
- Or click "Go Live" button in bottom status bar
- Quiz opens in browser with interactive features

---

## 🗺️ Visual Diagrams

- **[Visual Learning Diagrams](./diagrams/readme.md)** - Complete guide to visual learning

Quick links to key diagrams:
- 📊 [Course Structure](./diagrams/course_structure_diagram.md) - Complete course organization and navigation
- 🗺️ [Course Roadmap](./diagrams/course_roadmap.md) - Complete learning path visualization
- 🔄 [Component Lifecycle](./diagrams/component_lifecycle.md) - How React components work
- 📦 [State Management](./diagrams/state_management_flow.md) - State patterns and flows
- 🌐 [API Integration](./diagrams/api_data_flow.md) - Data fetching and caching
- 🔐 [Authentication](./diagrams/authentication_flow.md) - Auth system architecture
- 🏗️ [Full-Stack Architecture](./diagrams/project_architecture.md) - Complete system design

---

## 📚 How to Study This Course Effectively

### **Step 1: Start with Reference Guide**

**Goal**: Get a quick overview of what you'll learn
- Skim through main topics and code examples
- Don't try to understand everything deeply yet
- Focus on: "What concepts will I learn?"
- Mental preparation for the lesson ahead

### **Step 2: Explore Working Examples**

**Goal**: See concepts in action before diving into theory
- Run the example project first
- Play with the UI, test different features
- Open browser DevTools to inspect components
- Look at the code structure (don't read line-by-line yet)
- Ask yourself: "How does this work?"

### **Step 3: Read Theory as Reference**

**Goal**: Understand concepts deeply when needed
-  **DON'T** read cover-to-cover like a novel
-  **DO** read sections related to what you're coding
- Read concept → Go to example code → See it in action → Return to theory
- Use Ctrl+F to search for specific topics
- Bookmark important sections for later reference

### **Step 4: Code Along with Reference**

**Goal**: Build muscle memory and understanding
- Create a new project or use example as base
- Type every line yourself (even if you don't understand yet)
- Run code frequently to see results
- Make small changes to experiment
- Compare your code with example/ when stuck

### **Step 5: Complete Lab Project**

**Goal**: Apply knowledge to real-world scenarios
- Read requirements carefully
- Plan before coding (sketch components, data flow)
- Code incrementally (one feature at a time)
- Test each feature before moving to next
- **Get stuck?** → Check reference/ → Review example code → Read relevant theory section
- **Still stuck?** → Review example code more carefully → Try different approach
- Compare your solution with example/ after completion

### **Step 6: Take the Quiz**

**Goal**: Verify you're ready for next lesson
- Answer all questions honestly (no peeking!)
- Score below 70%? → Review weak areas → Retake quiz
- Score above 80%? → You're ready for next lesson!
- Use quiz results to identify what to review

### **Step 7: Review and Reflect**

**Goal**: Solidify learning before moving forward
- Review your lab code vs. example code
- What did you learn?
- What was challenging?
- What would you do differently?
- Write notes for future reference
- Create a personal cheat sheet

---

## 🚀 Getting Started

### Step 1: Check and Install Development Environment

**📋 First, ensure you have all required software installed:**

**[Go to Environment Setup Guide](../extras/environment_setup.md)** for detailed setup instructions

Make sure you have installed:
- Node.js (version 18 or higher)
- Visual Studio Code
- Git
- Required VS Code extensions

**Having installation or setup issues?**

**[Check Troubleshooting Guide](../extras/troubleshooting_guide.md)** for common problems and solutions

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
cd react-course/react-javascript
```

### Step 4: Recommended Learning Path

**Follow this exact order for the best learning experience:**

#### 1⃣ **Start with Prerequisites** (If needed)
- **[Lesson 0: JavaScript Prerequisites](./lesson0-javascript-es6/readme.md)**
- Review JavaScript ES6+ fundamentals
- Master arrow functions, destructuring, and async/await used in React

#### 2⃣ **Learn Lessons 1-5** (In sequence)
-  **[Lesson 1: React Fundamentals & Project Setup](./lesson1-fundamentals-setup/readme.md)**
-  **[Lesson 2: Component Architecture & React Hook](./lesson2-component-hook/readme.md)**
-  **[Lesson 3: API Integration & Data Management](./lesson3-api-data/readme.md)**
-  **[Lesson 4: Routing & Authentication ](./lesson4-routing-auth/readme.md)**
-  **[Lesson 5: Full-Stack Integration & Production Deployment](./lesson5-fullstack-deployment/readme.md)**

#### 3⃣ **Continue with Advanced Materials** (Optional)
- **[Advanced Materials & Resources](./extras/readme.md)** - Complete guide to advanced topics

- **[Advanced Patterns](./extras/advanced_patterns.md)**
- **[State Management Guide](./extras/state_management.md)**
- **[Performance Optimization](./extras/performance_optimization.md)**

### Step 5: Start Learning

```bash
# Start with Lesson 0 (if you need to review fundamentals)
cd lesson0-javascript-es6

# Or start directly with Lesson 1
cd lesson1-fundamentals-setup
```
---

## 💡 Learning Tips

- **Use *Markdown Preview Enhanced*** for better reading experience
- **Read the *readme***  of each lesson carefully before starting
- **Complete all labs** to solidify your understanding
- **Follow the *example* folder** to see complete example
- **Check the *Troubleshooting Guide*** for quick solutions

---
