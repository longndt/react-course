import './LoadingSpinner.css';

export function LoadingSpinner({ size = 'medium', text }) {
    return (
        <div className={`loading-container ${size}`}>
            <div className="spinner"></div>
            {text && <p className="loading-text">{text}</p>}
        </div>
    );
}
