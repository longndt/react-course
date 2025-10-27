# Lesson 5: Full-Stack & Deployment

## Overview

**Difficulty** Advanced **Prerequisites** Lesson 4 completed, routing and authentication knowledge

This lesson covers full-stack development and production deployment. You'll learn to build a complete backend with Express.js and MongoDB, implement file uploads, optimize performance, and deploy your application to production platforms.

---

## 🎯 Learning Objectives

After completing this lesson, you will be able to:

- ✅ Build RESTful APIs with Express.js
- ✅ Integrate MongoDB database with Mongoose
- ✅ Implement file upload and media management
- ✅ Optimize React applications for production
- ✅ Set up CI/CD pipelines for automated deployment
- ✅ Monitor application performance and errors
- ✅ Handle environment variables and secrets
- ✅ Deploy to cloud platforms (Vercel, Netlify, Railway)

---

## 📋 Prerequisites

Before starting this lesson, make sure you have:

### Required Knowledge
- ✅ React fundamentals and hooks
- ✅ API integration and HTTP methods
- ✅ JavaScript proficiency
- ✅ Basic understanding of databases
- ✅ Git version control

### Environment Setup
- ✅ Node.js 18+ installed
- ✅ MongoDB installed or MongoDB Atlas account
- ✅ Git configured
- ✅ Cloud platform account (Vercel/Netlify/Railway)

### Verification
```bash
# Check your setup
node --version  # Should be 18+
npm --version   # Should be 9+
mongod --version  # MongoDB daemon
```

> **⚠️ Not ready?** → Review [Lesson 4](../lesson4-routing-auth/) first

---

## 🚀 Quick Start

> 🎯 Goal: Deploy a production-ready full-stack application

### Setup
```bash
# 1. Create full-stack project
mkdir my-fullstack-app
cd my-fullstack-app

# 2. Initialize backend
mkdir backend && cd backend
npm init -y
npm install express mongoose cors dotenv

# 3. Initialize frontend
cd .. && npx create-vite@latest frontend -- --template react
cd frontend && npm install

# 4. Start both servers
npm run dev  # Frontend
npm run dev  # Backend
```

### Learning Path (Choose Your Style)
- 📖 ** Theory First** Start with [Theory](./theory/theory5.md) → [Example](./example/) → [Lab](./lab/lab5.md)
- ⚡ ** Hands-On** Start with [Reference](./reference/) → [Example](./example/) → [Theory](./theory/theory5.md)
- 🎯 ** Quick Review** [Reference](./reference/) → [Quiz](./quiz/quiz5.html) → Focus on weak areas

---

## What's Next

### Ready to Continue?
- **Completed this lesson?** → You've finished the React course! 🎉

### Need More Practice?
- **Study theory** → [theory5.md](./theory/theory5.md) - Deep dive into full-stack development

- **View examples** → [example/](./example/) - Follow-along tutorials

- **Practice exercises** → [lab5.md](./lab/lab5.md) - Production challenges

### Additional Resources
- **Quiz yourself** → [quiz/](./quiz/) - Test your knowledge
- ❓ ** Having issues?** → [Troubleshooting Guide](../extras/troubleshooting_guide.md)

- **Advanced topics** → Explore [Extra Materials](../extras/)

---

## Resources & References

### Course Guides
- **[Performance Optimization Guide](../extras/performance_optimization.md)** - useMemo, useCallback, code splitting, bundle analysis, Core Web Vitals
- [State Management Guide](../extras/state_management.md) - Redux, Zustand, Jotai patterns for complex apps
- [Troubleshooting Guide](../extras/troubleshooting_guide.md) - Common deployment issues and solutions

### Official Documentation
- [React Production Build](https://react.dev/learn/start-a-new-react-project#production-grade-react-frameworks) - Deployment guide
- [Express.js Guide](https://expressjs.com/en/guide/routing.html) - Backend framework
- [MongoDB Docs](https://www.mongodb.com/docs/manual/) - Database
- [Mongoose ODM](https://mongoosejs.com/docs/guide.html) - MongoDB object modeling

### Deployment Platforms
- [Vercel](https://vercel.com/docs) - Frontend deployment
- [Netlify](https://docs.netlify.com/) - Static site hosting
- [Railway](https://docs.railway.app/) - Full-stack deployment
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud database

### Performance & Monitoring
- [Web Vitals](https://web.dev/vitals/) - Core Web Vitals
- [Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) - Bundle size analysis
- [Sentry](https://sentry.io/) - Error monitoring
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance auditing