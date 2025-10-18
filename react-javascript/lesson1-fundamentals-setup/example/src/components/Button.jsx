import React from 'react';

function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false
}) {
  const className = `btn btn-${variant} btn-${size} ${disabled ? 'disabled' : ''}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
