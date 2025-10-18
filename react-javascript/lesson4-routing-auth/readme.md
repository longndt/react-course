# Lesson 4: Routing & Authentication

## Overview

**Difficulty**: Intermediate to Advanced
**Prerequisites**: Lesson 3 completed, API integration knowledge

This lesson covers client-side routing with React Router and authentication patterns. You'll learn to build multi-page applications, implement protected routes, handle user authentication with JWT tokens, and create secure user experiences.

---

## 🎯 Learning Objectives

After completing this lesson, you will be able to:

- ✅ Implement client-side routing with React Router
- ✅ Create protected routes and authentication guards
- ✅ Handle JWT token authentication and storage
- ✅ Build login/register forms with validation
- ✅ Manage user sessions and logout functionality
- ✅ Implement role-based access control
- ✅ Handle authentication state with Context API
- ✅ Secure API calls with authentication headers

---

## 📋 Prerequisites

Before starting this lesson, make sure you have:

### Required Knowledge
- ✅ React hooks (useState, useEffect, useContext)
- ✅ API integration and HTTP requests
- ✅ JavaScript Promises and async/await
- ✅ Basic understanding of authentication concepts
- ✅ Form handling and validation

### Environment Setup
- ✅ Node.js and npm installed
- ✅ React project
- ✅ React Router installed
- ✅ Backend server with authentication endpoints

### Verification
```bash
# Check your setup
node --version  # Should be 18+
npm --version   # Should be 9+
```

> **⚠️ Not ready?** → Review [Lesson 3](../lesson3-api-data/) first

---

## 🚀 Quick Start

> 🎯 Goal: Build a secure multi-page application with authentication

### Setup
```bash
# 1. Create new React project
npm create vite@latest my-auth-app -- --template react
cd my-auth-app

# 2. Install dependencies
npm install react-router-dom axios

# 3. Start development server
npm run dev
```

### Learning Path (Choose Your Style)
- 📖 **Theory First**: Start with [Theory](./theory/theory4.md) → [Examples](./example/) → [Lab](./lab/lab4.md)
- ⚡ **Hands-On**: Start with [Reference](./reference/) → [Examples](./example/) → [Theory](./theory/theory4.md)
- 🎯 **Quick Review**: [Reference](./reference/) → [Quiz](./quiz/quiz4.html) → Focus on weak areas

---

## What's Next

### Ready to Continue?
- **Completed this lesson?** → Proceed to [Lesson 5: Full-Stack & Deployment](../lesson5-fullstack-deployment/)

### Need More Practice?
- **Study theory** → [theory4.md](./theory/theory4.md) - Deep dive into routing and auth
- **View examples** → [example/](./example/) - Follow-along tutorials
- **Practice exercises** → [lab4.md](./lab/lab4.md) - Auth challenges

### Additional Resources
- **Quiz yourself** → [quiz/](./quiz/) - Test your knowledge
- ❓ **Having issues?** → [Troubleshooting Guide](../extras/troubleshooting_guide.md)
- **Learn deployment** → Preview [Lesson 5](../lesson5-fullstack-deployment/)

---

## Resources & References

### Course Guides
- [Troubleshooting Guide](../extras/troubleshooting_guide.md) - Common routing and auth issues

### Official Documentation
- [React Router](https://reactrouter.com/) - Client-side routing
- [React Context](https://react.dev/reference/react/useContext) - State management
- [JWT.io](https://jwt.io/) - JSON Web Token information
- [React Forms](https://react.dev/reference/react-dom/components/form) - Form handling

### Authentication & Security
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) - Security best practices
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725) - JWT security guidelines
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) - Cross-origin resource sharing

### Form Validation & UX
- [React Hook Form](https://react-hook-form.com/) - Form library
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [React DevTools](https://react.dev/learn/react-developer-tools) - Debugging tools