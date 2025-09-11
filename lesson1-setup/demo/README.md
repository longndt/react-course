# React Setup Demos

This folder contains different approaches to setting up React applications:

## 1. Vite Demo

Modern build tool setup with React and TypeScript.

### Features

- Fast development server
- TypeScript support
- CSS modules
- Hot Module Replacement
- Optimized production builds

### Running the Demo

```bash
cd vite-demo
npm install
npm run dev
```

## 2. HTML Integration

Direct React integration in HTML without build tools.

### Features

- No build setup required
- Quick prototyping
- Direct script inclusion
- Babel transformation in browser

### Running the Demo

Simply open `html-integration/index.html` in a browser.

## Comparison of Approaches

### Vite Setup

#### Pros:

- Modern development experience
- TypeScript support
- Fast hot module replacement
- Optimized production builds
- Rich ecosystem integration

#### Cons:

- Initial setup required
- Build configuration needed
- More complex project structure

### Direct HTML Integration

#### Pros:

- Zero setup required
- Great for learning/prototyping
- Simple to understand
- No build step

#### Cons:

- No TypeScript support
- Limited optimization
- No module system
- Not suitable for production

## Best Practices

1. Development Setup

   - Use TypeScript for type safety
   - Configure ESLint and Prettier
   - Set up proper IDE support
   - Use Git for version control

2. Project Structure

   ```
   src/
   ├── components/  # Reusable components
   ├── assets/     # Static assets
   ├── styles/     # Global styles
   └── types/      # TypeScript types
   ```

3. Code Organization

   - One component per file
   - Consistent naming conventions
   - Proper type definitions
   - Clear component hierarchy

4. Performance
   - Code splitting
   - Lazy loading
   - Asset optimization
   - Bundle size monitoring

## Learning Objectives

After exploring these demos, you should understand:

- Different ways to set up React
- Pros and cons of each approach
- Modern development tooling
- TypeScript integration
- Basic React concepts

## Additional Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Modern JavaScript Guide](https://javascript.info)
