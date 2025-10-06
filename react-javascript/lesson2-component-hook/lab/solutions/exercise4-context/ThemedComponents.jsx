import { useTheme } from "./ThemeContext";
import PropTypes from 'prop-types';
import "./ThemedComponents.css";

// ThemedButton Component
export function ThemedButton({
  onClick,
  children,
  variant = "primary",
}) {
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

ThemedButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

// ThemeToggle Component
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={`theme-toggle ${theme}`} onClick={toggleTheme}>
      {theme === "light" ? " Dark Mode" : " Light Mode"}
    </button>
  );
}
