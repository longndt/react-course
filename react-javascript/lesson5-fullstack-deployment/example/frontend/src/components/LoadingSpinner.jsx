import React from 'react';
import './LoadingSpinner.css';

/**
 * @typedef {Object} LoadingSpinnerProps
 * @property {'small' | 'medium' | 'large'} [size]
 * @property {boolean} [fullScreen]
 */

/**
 * @param {LoadingSpinnerProps} props
 */
const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="loading-spinner-fullscreen">
        <div className={`spinner spinner-${size}`}></div>
        <p className="loading-text">Loading...</p>
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
