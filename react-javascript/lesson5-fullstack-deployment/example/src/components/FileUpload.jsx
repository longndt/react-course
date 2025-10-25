import React, { useState, useRef } from 'react';
import './FileUpload.css';

const FileUpload = ({ onUpload, onMultipleUpload, multiple = false, accept = "image/*" }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFiles(files);
        }
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleFiles(files);
        }
    };

    const handleFiles = async (files) => {
        if (files.length === 0) return;

        setUploading(true);

        try {
            if (multiple) {
                await onMultipleUpload(files);
            } else {
                await onUpload(files[0]);
                // Show preview for single file
                if (files[0].type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => setPreview(e.target.result);
                    reader.readAsDataURL(files[0]);
                }
            }
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const clearPreview = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="file-upload-container">
            <div
                className={`file-upload-area ${isDragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={openFileDialog}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple={multiple}
                    accept={accept}
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />

                {uploading ? (
                    <div className="upload-progress">
                        <div className="spinner"></div>
                        <p>Uploading...</p>
                    </div>
                ) : (
                    <div className="upload-content">
                        <div className="upload-icon">📁</div>
                        <p className="upload-text">
                            {isDragOver
                                ? 'Drop files here'
                                : `Click to select ${multiple ? 'files' : 'file'} or drag and drop`
                            }
                        </p>
                        <p className="upload-hint">
                            {accept === "image/*"
                                ? 'Images only (PNG, JPG, GIF)'
                                : 'All file types supported'
                            }
                        </p>
                    </div>
                )}
            </div>

            {preview && (
                <div className="file-preview">
                    <img src={preview} alt="Preview" />
                    <button onClick={clearPreview} className="remove-preview">
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
