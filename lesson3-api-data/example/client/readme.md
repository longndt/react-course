# React Course - Lesson 3: Client (Frontend)

A React + TypeScript application that demonstrates API integration and data fetching using Vite as the build tool.

## 🏗️ Project Structure

```
client/
├── src/
│   ├── components/          # React components
│   │   ├── ProductForm.tsx  # Form for creating products
│   │   └── ProductList.tsx  # Display list of products
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 📡 API Integration

The client connects to the backend API server running on `http://localhost:3001`.

Make sure the server is running before starting the client:
```bash
# In the server directory
npm run dev
```

## 🛠️ Technologies Used

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **CSS** - Styling

## 📚 Learning Objectives

This client application demonstrates:
1. ✅ **React Components** - Functional components with hooks
2. ✅ **TypeScript** - Type safety in React
3. ✅ **API Integration** - Fetching and sending data to backend
4. ✅ **State Management** - Managing application state
5. ✅ **Forms** - Handling user input
6. ✅ **CRUD Operations** - Create, Read, Update, Delete

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Development Server

The application will be available at:
- Local: `http://localhost:5173`
- Network: Check terminal for network URL

