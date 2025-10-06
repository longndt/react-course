## 🗺️ Course Roadmap

**[COURSE_ROADMAP.md](./COURSE_ROADMAP.md)**

Complete visual learning path showing:
- Full course progression (Lesson 0 → Lesson 5)
- Dual-track system (TypeScript & JavaScript)
- Difficulty progression chart
- Practice percentage system (40% → 90%)
- Learning outcomes timeline (Gantt chart)
- Component structure per lesson
- Support resources mindmap
- Quick start guide flowchart

**Best for**: Getting oriented, planning your learning path, understanding course structure

---

## 🔄 Component Lifecycle & Hooks

**[COMPONENT_LIFECYCLE.md](./COMPONENT_LIFECYCLE.md)**

Visual diagrams covering:
- Component lifecycle overview (mount, update, unmount)
- Functional component render cycle
- useState hook lifecycle
- useEffect execution timeline
- Multiple hooks execution order
- useEffect dependency array behavior
- Component re-render triggers
- Batching and async updates
- Custom hook lifecycle
- Class vs Functional component comparison
- Memory leak prevention
- React.StrictMode double rendering

**Best for**: Understanding React internals, debugging render issues, mastering hooks

**Related Lessons**: Lesson 1 (React Fundamentals), Lesson 2 (Components & Hooks)

---

## 📦 State Management Flow

**[STATE_MANAGEMENT_FLOW.md](./STATE_MANAGEMENT_FLOW.md)**

Comprehensive state patterns:
- State management levels overview
- Local state (useState) flow
- Lifted state (props drilling) vs Context API
- Context API architecture
- useReducer state flow
- Zustand (external library) flow
- Redux Toolkit complete flow
- State management decision tree
- Immutable update patterns
- Async state updates (API calls)
- State synchronization across tabs
- Performance optimization (React.memo, useMemo)

**Best for**: Choosing the right state solution, implementing global state, optimizing performance

**Related Lessons**: Lesson 2 (Components & Hooks), Lesson 3 (API & Data)

**Related Extra Material**: [State Management Guide](../extra/state-management.md)

---

## 🌐 API Integration & Data Flow

**[API_DATA_FLOW.md](./API_DATA_FLOW.md)**

Complete API integration patterns:
- Complete API request lifecycle
- useState for data fetching
- React Query/TanStack Query flow
- CRUD operations flow
- Optimistic updates pattern
- Pagination flow
- Infinite scroll flow
- Error handling strategies
- Loading states UI patterns
- Caching strategy
- Full-stack data flow (frontend → backend → DB)
- WebSocket real-time updates
- File upload flow with progress

**Best for**: Implementing data fetching, handling errors, building real-time features

**Related Lessons**: Lesson 3 (API & Data), Lesson 5 (Full-Stack)

---

## 🔐 Authentication & Authorization

**[AUTHENTICATION_FLOW.md](./AUTHENTICATION_FLOW.md)**

Complete auth system diagrams:
- Complete authentication flow (register, login, logout)
- JWT token lifecycle
- Protected route flow
- Auth Context provider pattern
- API requests with auth tokens
- Role-based access control (RBAC)
- Token refresh flow
- Social OAuth flow (Google/GitHub)
- Password reset flow
- Session vs Token comparison

**Best for**: Implementing authentication, protecting routes, managing user sessions

**Related Lessons**: Lesson 4 (Routing & Auth)

---

## 🏗️ Full-Stack Architecture

**[PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md)**

Complete system architecture:
- Full-stack architecture overview
- Development environment setup
- Folder structure architecture
- HTTP request flow (detailed)
- Database schema architecture (ERD)
- Component-to-database data flow
- Authentication integration architecture
- Error handling architecture
- Production deployment architecture
- Environment configuration flow
- State management integration
- Real-time features (WebSocket)
- Caching strategy architecture
- Security layers

**Best for**: Understanding the big picture, planning projects, deployment

**Related Lessons**: Lesson 3 (API), Lesson 4 (Auth), Lesson 5 (Deployment)

---

## 📚 How to Use These Diagrams ?

### In GitHub
All diagrams render automatically when viewing on GitHub. Simply click any diagram file to view.

### In VS Code
Install the **Markdown Preview Mermaid Support** extension:
```
code --install-extension bierner.markdown-mermaid
```

Then preview any markdown file with `Ctrl+Shift+V` (Windows) or `Cmd+Shift+V` (Mac).

### In Other Editors
Most modern markdown editors support Mermaid. If not, copy the Mermaid code blocks and paste into:
- [Mermaid Live Editor](https://mermaid.live/)

---

## 🎯 Diagram Usage by Learning Stage

### Stage 1: Beginner (Lesson 0-1)
Start with:
1. **COURSE_ROADMAP.md** - Understand the learning path
2. **COMPONENT_LIFECYCLE.md** (sections 1-4) - Basic lifecycle
3. **STATE_MANAGEMENT_FLOW.md** (sections 1-3) - Local state only

### Stage 2: Intermediate (Lesson 2-3)
Progress to:
1. **COMPONENT_LIFECYCLE.md** (complete) - All hooks patterns
2. **STATE_MANAGEMENT_FLOW.md** (sections 4-8) - Context API, useReducer
3. **API_DATA_FLOW.md** (sections 1-7) - Data fetching patterns

### Stage 3: Advanced (Lesson 4-5)
Master:
1. **AUTHENTICATION_FLOW.md** (complete) - Full auth system
2. **PROJECT_ARCHITECTURE.md** (complete) - System design
3. **API_DATA_FLOW.md** (sections 8-13) - Advanced patterns

---

## 📖 Diagram Legend

### Common Shapes
- **Rectangle** `[ ]` - Process or component
- **Rounded Rectangle** `( )` - Start/End point
- **Diamond** `{ }` - Decision point
- **Cylinder** `[( )]` - Database
- **Circle** `(( ))` - Central concept

### Common Colors
- 🟢 **Green** - Success, correct path, recommended
- 🟡 **Yellow** - Warning, optional, in-progress
- 🔵 **Blue** - Information, reference, standard
- 🔴 **Red** - Error, incorrect, deprecated

### Arrow Types
- `-->` Solid line - Main flow
- `-.->` Dashed line - Optional/alternative flow
- `==>` Thick line - Important/emphasized flow

---

## 🎓 Learning Tips

1. **Start with the roadmap** to understand the big picture
2. **Reference diagrams while coding** to reinforce concepts
3. **Recreate diagrams from memory** to test understanding
4. **Modify diagrams** for your own projects
5. **Use diagrams in documentation** for your portfolio

---
