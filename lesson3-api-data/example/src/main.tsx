import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
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

  try {
    const { worker } = await import('./mocks/browser');
    console.log('MSW: Worker imported successfully');

    // MSW 2.0 with simpler setup and timeout
    console.log('MSW: Attempting to start worker...');

    // Wrap in timeout to prevent hanging
    const startWithTimeout = Promise.race([
      worker.start({
        onUnhandledRequest: 'bypass',
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('MSW start timeout')), 5000)
      )
    ]);

    await startWithTimeout;

    console.log('MSW: Mock API worker started successfully');
    return worker;
  } catch (error) {
    console.error('MSW: Failed to start worker:', error);
    console.error('MSW: Error details:', error.message);
    throw error;
  }
}

enableMocking()
  .then(() => {
    console.log('MSW: Starting React app...');
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  })
  .catch((error) => {
    console.error('MSW: Failed to start MSW, starting app anyway:', error);
    console.log('MSW: App will run without MSW - API calls will fail but app will load');
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
