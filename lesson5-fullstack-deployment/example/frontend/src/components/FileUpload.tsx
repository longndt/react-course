import React, { useState, useCallback } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface FileUploadProps {
    onSingleUpload: (file: File) => Promise<void>;
    onMultipleUpload: (files: File[]) => Promise<void>;
    isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
    onSingleUpload,
    onMultipleUpload,
    isLoading,
}) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const files = Array.from(e.dataTransfer.files);
            if (files.length === 1) {
                onSingleUpload(files[0]);
            } else {
                onMultipleUpload(files);
            }
        }
    }, [onSingleUpload, onMultipleUpload]);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const files = Array.from(e.target.files);
            if (files.length === 1) {
                onSingleUpload(files[0]);
            } else {
                onMultipleUpload(files);
            }
        }
    };

    return (
        <div
            className={`upload-area ${dragActive ? 'dragover' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div style={{ marginBottom: '1rem' }}>
                        <h3>Upload Files</h3>
                        <p>Drag and drop files here, or click to select files</p>
                    </div>

                    <input
                        type="file"
                        multiple
                        onChange={handleFileInput}
                        style={{ display: 'none' }}
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        style={{
                            display: 'inline-block',
                            padding: '0.75rem 1.5rem',
                            background: '#3b82f6',
                            color: 'white',
                            borderRadius: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        Choose Files
                    </label>
                </>
            )}
        </div>
    );
};

export default FileUpload;
