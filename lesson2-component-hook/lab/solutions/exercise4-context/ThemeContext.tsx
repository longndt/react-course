import { createContext, useContext, useState, ReactNode } from "react";

// Theme type
type Theme = "light" | "dark";

// Context value interface
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// Create Context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Provider Props
interface ThemeProviderProps {
  children: ReactNode;
}

// Provider Component
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom Hook
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
