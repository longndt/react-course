import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({
    message,
    type,
    isVisible,
    onClose,
    duration = 3000
}) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`toast toast-${type} ${isVisible ? 'toast-show' : ''}`}>
            <div className="toast-content">
                <div className="toast-icon">
                    {type === 'success' && '✓'}
                    {type === 'error' && '✕'}
                    {type === 'info' && 'ℹ'}
                </div>
                <div className="toast-message">{message}</div>
                <button className="toast-close" onClick={onClose}>
                    ×
                </button>
            </div>
        </div>
    );
};

export default Toast;
