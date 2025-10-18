# Lesson 3: API & Data Management

## Overview

**Difficulty**: Intermediate
**Prerequisites**: Lesson 2 completed, React hooks knowledge

This lesson covers API integration and data management in React applications. You'll learn to fetch data from REST APIs, handle loading states, manage errors, and implement modern data fetching patterns with React Query.

---

## 🎯 Learning Objectives

After completing this lesson, you will be able to:

- ✅ Integrate REST APIs with React applications
- ✅ Handle asynchronous data fetching with useEffect
- ✅ Manage loading states and error handling
- ✅ Implement CRUD operations (Create, Read, Update, Delete)
- ✅ Use React Query for advanced data management
- ✅ Handle authentication and protected routes
- ✅ Optimize API calls and prevent unnecessary requests
- ✅ Test API integration with mock data

---

## 📋 Prerequisites

Before starting this lesson, make sure you have:

### Required Knowledge
- ✅ React hooks (useState, useEffect)
- ✅ JavaScript async/await and Promises
- ✅ HTTP methods (GET, POST, PUT, DELETE)
- ✅ JSON data format
- ✅ Basic understanding of REST APIs

### Environment Setup
- ✅ Node.js and npm installed
- ✅ React project with TypeScript
- ✅ API testing tool (Postman or browser DevTools)
- ✅ Backend server (provided in examples)

### Verification
```bash
# Check your setup
node --version  # Should be 18+
npm --version   # Should be 9+
```

> **⚠️ Not ready?** → Review [Lesson 2](../lesson2-component-hook/) first

---

## 🚀 Quick Start

> 🎯 Goal: Build a full-stack application with API integration

### Setup
```bash
# 1. Create new React project
npm create vite@latest my-api-app -- --template react-ts
cd my-api-app

# 2. Install dependencies
npm install axios react-query

# 3. Start development server
npm run dev
```

### Learning Path (Choose Your Style)
- 📖 **Theory First**: Start with [Theory](./theory/theory3.md) → [Examples](./example/) → [Lab](./lab/lab3.md)
- ⚡ **Hands-On**: Start with [Reference](./reference/) → [Examples](./example/) → [Theory](./theory/theory3.md)
- 🎯 **Quick Review**: [Reference](./reference/) → [Quiz](./quiz/quiz3.html) → Focus on weak areas

---

## What's Next

### Ready to Continue?
- **Completed this lesson?** → Proceed to [Lesson 4: Routing & Authentication](../lesson4-routing-auth/)

### Need More Practice?
- **Study theory** → [theory3.md](./theory/theory3.md) - Deep dive into API integration
- **View examples** → [example/](./example/) - Follow-along tutorials
- **Practice exercises** → [lab3.md](./lab/lab3.md) - CRUD challenges

### Additional Resources
- **Quiz yourself** → [quiz/](./quiz/) - Test your API knowledge
- ❓ **Having issues?** → [Troubleshooting Guide](../extras/troubleshooting_guide.md)
- 🔐 **Learn auth next** → Preview [Lesson 4](../lesson4-routing-auth/)

---

## Resources & References

### Course Guides
- [Troubleshooting Guide](../extras/troubleshooting_guide.md) - Common API integration issues

### Official Documentation
- [React Data Fetching](https://react.dev/learn/synchronizing-with-effects) - useEffect for data fetching
- [Axios Documentation](https://axios-http.com/docs/intro) - HTTP client library
- [React Query](https://tanstack.com/query/latest) - Data fetching and caching
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - Native browser API

### API Testing & Development
- [Postman](https://www.postman.com/) - API testing tool
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Free fake API for testing
- [REST API Design](https://restfulapi.net/) - API design principles

### Error Handling & Best Practices
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) - React error handling
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) - Status code reference
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) - Cross-origin resource sharing