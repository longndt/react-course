import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Start MSW worker for mock API (only in mock mode)
async function enableMocking() {
  // Only enable MSW when running in mock mode
  if (import.meta.env.MODE !== 'mock') {
    console.log('MSW: Not in mock mode, using real server');
    return;
  }

  if (process.env.NODE_ENV !== 'development') {
    console.log('MSW: Not in development mode, skipping MSW');
    return;
  }

  console.log('MSW: Starting MSW worker for mock API...');
  const { worker } = await import('./mocks/browser.js');

  // MSW 2.0 syntax
  await worker.start({
    onUnhandledRequest: 'bypass',
  });

  console.log('MSW: Mock API worker started successfully');
  return worker;
}

enableMocking()
  .then(() => {
    console.log('MSW: Starting React app...');
    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  })
  .catch((error) => {
    console.error('MSW: Failed to start MSW, starting app anyway:', error);
    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });