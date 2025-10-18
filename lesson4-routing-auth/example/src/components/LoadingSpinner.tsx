import './LoadingSpinner.css';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large' | 'fullscreen';
    text?: string;
}

export function LoadingSpinner({ size = 'medium', text }: LoadingSpinnerProps) {
    return (
        <div className={`loading-container ${size}`}>
            <div className="spinner"></div>
            {text && <p className="loading-text">{text}</p>}
        </div>
    );
}
