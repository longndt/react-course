import { useTheme } from "./ThemeContext";
import "./ThemedComponents.css";

// ThemedButton Component
interface ThemedButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function ThemedButton({
  onClick,
  children,
  variant = "primary",
}: ThemedButtonProps) {
  const { theme } = useTheme();

  return (
    <button
      className={`themed-button ${theme} ${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ThemeToggle Component
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={`theme-toggle ${theme}`} onClick={toggleTheme}>
      {theme === "light" ? " Dark Mode" : " Light Mode"}
    </button>
  );
}
