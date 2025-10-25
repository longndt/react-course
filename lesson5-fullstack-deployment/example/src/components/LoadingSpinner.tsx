import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'spinner' | 'circular' | 'circular-fast';
  text?: string;
  inline?: boolean;
}

export function LoadingSpinner({
  size = 'medium',
  variant = 'spinner',
  text = 'Loading...',
  inline = false
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: '16px',
    medium: '40px',
    large: '60px'
  };

  const currentSize = sizeClasses[size];

  if (inline) {
    return (
      <div className="inline-loading">
        <CircularProgress size={currentSize} variant={variant} />
        {text && <span>{text}</span>}
      </div>
    );
  }

  if (variant === 'spinner') {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner" style={{ width: currentSize, height: currentSize }}></div>
        {text && <p>{text}</p>}
      </div>
    );
  }

  return (
    <div className="loading-spinner-container">
      <CircularProgress size={currentSize} variant={variant} />
      {text && <p>{text}</p>}
    </div>
  );
}

interface CircularProgressProps {
  size: string;
  variant: 'circular' | 'circular-fast';
}

function CircularProgress({ size, variant }: CircularProgressProps) {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width="100%" height="100%" viewBox="0 0 50 50">
        <circle
          className="background"
          cx="25"
          cy="25"
          r={radius}
        />
        <circle
          className={variant}
          cx="25"
          cy="25"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </svg>
    </div>
  );
}

export default LoadingSpinner;
