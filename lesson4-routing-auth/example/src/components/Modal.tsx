import { ReactNode, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    type?: 'success' | 'error' | 'info';
}

export function Modal({ isOpen, onClose, title, children, type = 'info' }: ModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            default:
                return 'ℹ️';
        }
    };

    const getTypeClass = () => {
        switch (type) {
            case 'success':
                return 'modal-success';
            case 'error':
                return 'modal-error';
            default:
                return 'modal-info';
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal ${getTypeClass()}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">
                        <span className="modal-icon">{getIcon()}</span>
                        {title}
                    </h3>
                    <button className="modal-close" onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={onClose}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
