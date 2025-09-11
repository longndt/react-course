# Setting Up React Projects

## 1. Create React App (CRA)

The official and most beginner-friendly way to create React applications.

```bash
npx create-react-app my-app
cd my-app
npm start
```

## 2. Vite

A modern build tool that offers faster setup and development experience.

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

## 3. Next.js

Ideal for server-side rendering and production-ready applications.

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

## 4. Direct HTML Integration

Simple approach for learning or small projects:

```html
<!DOCTYPE html>
<html>
  <head>
    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      // Your React code here
    </script>
  </body>
</html>
```

## 5. Using Templates

Clone and customize existing templates:

```bash
git clone https://github.com/your-preferred-template.git
cd template-name
npm install
```

## Recommended Approaches

### For Beginners

- Use Create React App (CRA)
- Simple setup and good documentation
- Built-in best practices

### For Production

- Consider Vite or Next.js
- Better performance and optimization
- More flexible configuration

### For Learning

- Direct HTML approach
- No build tools required
- Immediate feedback

### For Performance

- Manual setup or Vite
- Complete control over dependencies
- Faster build times

## Trade-offs to Consider

- Setup time
- Configuration flexibility
- Development experience
- Build performance
- Production optimization

## Offline Setup Options

If you have slow internet or need offline setup:

1. **Create and save a template project**

```bash
# When online:
npx create-react-app template-project
cd template-project
npm install

# Save for offline use:
cp -r template-project ~/Documents/react-templates/

# Use offline:
cp -r ~/Documents/react-templates/template-project ./my-new-project
```

2. **Use Vite with local dependencies**
3. **Create minimal manual setup**
4. **Use Docker images**
5. **Setup yarn offline mirror**
