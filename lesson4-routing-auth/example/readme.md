# React Routing & Authentication Demo

This is a demo application showcasing React Router and authentication patterns.

## 🚀 Quick Start

> 🎯 Goal: Explore React routing and authentication patterns

### Setup
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173
```

## ✨ Features

- **React Router** for navigation

- **Mock Authentication** with JWT simulation

- **Protected Routes** with automatic redirects

- **User Registration** and login forms

- **Shopping Cart** with local state management

- **Product Catalog** with mock data

- **User Profile** with order history

- **Responsive Design** for all devices

## 🔐 Demo Credentials

### Login
- **Email:**`demo@example.com`

- **Password:**`password`

### Registration
- Use any valid email, password, and name
- All registrations are simulated locally

## 🏗️ Project Structure

```
src/
├── auth/
│   ├── AuthContext.tsx    # Authentication context & logic
│   └── ProtectedRoute.tsx # Route protection component
├── components/
│   ├── Layout.tsx         # Main layout wrapper
│   └── Layout.css         # Layout styles
├── pages/
│   ├── Home.tsx           # Landing page
│   ├── Login.tsx          # Auth forms
│   ├── Products.tsx       # Product catalog
│   ├── Profile.tsx        # User profile
│   └── Cart.tsx           # Shopping cart
└── index.css              # Global styles
```

## 🎯 Key Concepts Demonstrated

### 1. ** React Router Setup**
- BrowserRouter configuration
- Route definitions and nesting
- Navigation with useNavigate
- Location state handling

### 2. ** Authentication Patterns**
- Context API for global auth state
- JWT token simulation
- Protected route implementation
- Automatic login/logout handling

### 3. ** State Management**
- Local component state
- Context for global state
- Form state handling
- Loading and error states

### 4. ** API Integration**
- Mock API calls with realistic delays
- Error handling patterns
- Loading states
- Data fetching with useEffect

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
```

## 🔧 Customization

### Adding New Routes
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Layout.tsx`

### Modifying Authentication
1. Update `src/auth/AuthContext.tsx`
2. Modify login/register logic
3. Update protected route logic

### Styling Changes
1. Modify `src/index.css` for global styles
2. Update `src/components/Layout.css` for layout
3. Add component-specific styles

## 🐛 Troubleshooting

### Common Issues

**"Module not found" errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
```bash
# Use different port
npm run dev -- --port 3001
```

**Authentication not working:**
- Check browser console for errors
- Verify localStorage has token
- Try clearing browser data

## 📚 Learning Resources

- [React Router Documentation](https://reactrouter.com/)
- [React Context API](https://react.dev/reference/react/useContext)
- [JWT Authentication](https://jwt.io/introduction)
- [React Hooks](https://react.dev/reference/react)

## Next Steps

1. **Add Real API Integration** - Replace mock data with real API calls
2. **Implement Form Validation** - Add proper form validation
3. **Add Error Boundaries** - Implement error boundary components
4. **Add Tests** - Write unit and integration tests
5. **Add PWA Features** - Make it a Progressive Web App

---

** Happy Coding!**🚀