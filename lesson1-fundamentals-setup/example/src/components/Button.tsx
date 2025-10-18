import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick: () => void;
  disabled?: boolean;
  // Accessibility props
  ariaLabel?: string;
  ariaDescribedBy?: string;
  type?: 'button' | 'submit' | 'reset';
  role?: string;
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  type = 'button',
  role
}: ButtonProps) {
  const className = `btn btn-${variant} btn-${size} ${disabled ? 'disabled' : ''}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
      role={role}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
