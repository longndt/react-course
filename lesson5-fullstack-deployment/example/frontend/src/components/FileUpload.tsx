import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';
import './FileUpload.css';

interface FileUploadProps {
    onUploadSuccess?: (files: any[]) => void;
    multiple?: boolean;
    maxFiles?: number;
    acceptedTypes?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
    onUploadSuccess,
    multiple = false,
    maxFiles = 5,
    acceptedTypes = "image/*,.pdf,.doc,.docx,.txt"
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { token } = useAuth();

    const handleFiles = async (files: FileList) => {
        if (!files || files.length === 0) return;

        const fileArray = Array.from(files);

        if (fileArray.length > maxFiles) {
            setError(`Maximum ${maxFiles} files allowed`);
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();

            if (multiple) {
                fileArray.forEach(file => {
                    formData.append('files', file);
                });
            } else {
                formData.append('file', fileArray[0]);
            }

            const endpoint = multiple ? '/api/upload/multiple' : '/api/upload';

            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                const newFiles = multiple ? result.data.files : [result.data];
                setUploadedFiles(prev => [...prev, ...newFiles]);
                onUploadSuccess?.(newFiles);
            } else {
                setError(result.error || 'Upload failed');
            }
        } catch (err) {
            setError('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const onButtonClick = () => {
        fileInputRef.current?.click();
    };

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="file-upload-container">
            <div
                className={`file-upload-dropzone ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple={multiple}
                    accept={acceptedTypes}
                    onChange={handleChange}
                    className="file-input"
                />

                <div className="file-upload-content">
                    {isUploading ? (
                        <LoadingSpinner size="medium" variant="circular" text="Uploading..." />
                    ) : (
                        <>
                            <div className="upload-icon">📁</div>
                            <p className="upload-text">
                                {dragActive
                                    ? 'Drop files here'
                                    : multiple
                                        ? 'Drag & drop files here or click to select'
                                        : 'Drag & drop a file here or click to select'
                                }
                            </p>
                            <p className="upload-hint">
                                {multiple ? `Up to ${maxFiles} files` : 'Single file only'} • Max 5MB each
                            </p>
                            <button
                                type="button"
                                onClick={onButtonClick}
                                className="upload-button"
                                disabled={isUploading}
                            >
                                Choose Files
                            </button>
                        </>
                    )}
                </div>
            </div>

            {error && (
                <div className="upload-error">
                    {error}
                </div>
            )}

            {uploadedFiles.length > 0 && (
                <div className="uploaded-files">
                    <h4>Uploaded Files:</h4>
                    <div className="file-list">
                        {uploadedFiles.map((file, index) => (
                            <div key={index} className="file-item">
                                <div className="file-info">
                                    <span className="file-name">{file.originalName}</span>
                                    <span className="file-size">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                </div>
                                <div className="file-actions">
                                    <a
                                        href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}${file.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="view-link"
                                    >
                                        View
                                    </a>
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="remove-button"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
