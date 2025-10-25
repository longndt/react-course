import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="loading-spinner-fullscreen">
        <div className={`spinner spinner-${size}`}></div>
      </div>
    );
  }

  return (
    <div className="loading-spinner-inline">
      <div className={`spinner spinner-${size}`}></div>
    </div>
  );
};

export default LoadingSpinner;
