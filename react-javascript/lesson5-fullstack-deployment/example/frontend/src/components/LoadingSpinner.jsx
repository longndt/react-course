import './LoadingSpinner.css';

/**
 * @param {Object} props
 * @param {'small'|'medium'|'large'} [props.size='medium']
 * @param {boolean} [props.fullScreen=false]
 */
const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
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
