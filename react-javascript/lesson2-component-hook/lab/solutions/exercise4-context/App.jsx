import { ThemeProvider, useTheme } from "./ThemeContext";
import { ThemedButton, ThemeToggle } from "./ThemedComponents";
import "./App.css";

// Main Content Component (consumes theme)
function MainContent() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <ThemeToggle />

      <div className="content">
        <header className="header">
          <h1>Context API Theme System</h1>
          <p>Complete theme switching with global state management</p>
        </header>

        <section className="demo-section">
          <h2>Themed Components</h2>
          <p>All components automatically respond to theme changes</p>

          <div className="button-group">
            <ThemedButton
              variant="primary"
              onClick={() => alert("Primary button clicked!")}
            >
              Primary Action
            </ThemedButton>

            <ThemedButton
              variant="secondary"
              onClick={() => alert("Secondary button clicked!")}
            >
              Secondary Action
            </ThemedButton>
          </div>
        </section>

        <section className="demo-section">
          <h2>Theme Features</h2>
          <ul>
            <li> Global theme state with Context API</li>
            <li> Custom useTheme hook for easy access</li>
            <li> Automatic theme propagation to all components</li>
            <li> CSS variables for dynamic theming</li>
            <li> Smooth transitions between themes</li>
            <li> Type-safe with TypeScript</li>
          </ul>
        </section>

        <section className="demo-section">
          <h2>How It Works</h2>
          <p>
            The ThemeContext provides theme state to all components in the tree.
            Components use the useTheme() hook to access current theme and toggle function.
          </p>
          <p>
            Current theme: <strong>{theme}</strong>
          </p>
        </section>
      </div>
    </div>
  );
}

// App Component (provides theme)
function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

export default App;
