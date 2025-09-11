import { useState } from "react";
import "./App.css";

/**
 * Simple counter component demonstrating:
 * - State management with useState
 * - Event handling
 * - TypeScript integration
 * - Component structure
 */
export function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>React + Vite Demo</h1>
      </header>

      <main className="app-main">
        <div className="counter">
          <h2>Counter Example</h2>

          <div className="counter-display">Count: {count}</div>

          <div className="counter-controls">
            <button
              onClick={decrement}
              className="counter-button"
              aria-label="Decrease count"
            >
              -
            </button>

            <button
              onClick={reset}
              className="counter-button"
              aria-label="Reset count"
            >
              Reset
            </button>

            <button
              onClick={increment}
              className="counter-button"
              aria-label="Increase count"
            >
              +
            </button>
          </div>
        </div>

        <div className="features">
          <h2>Features Demonstrated</h2>
          <ul>
            <li>Vite Development Server</li>
            <li>React 18 Setup</li>
            <li>TypeScript Integration</li>
            <li>CSS Modules Support</li>
            <li>State Management</li>
            <li>Event Handling</li>
            <li>Accessibility</li>
          </ul>
        </div>
      </main>

      <footer className="app-footer">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </footer>
    </div>
  );
}
