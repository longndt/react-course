import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import './FileManager.css';

const FileManager = () => {
    const { user } = useAuth();
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/upload/files', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch files');
            }

            const data = await response.json();
            setFiles(data.data.files || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSingleUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            console.log('Upload successful:', data);

            // Refresh files list
            await fetchFiles();
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.message);
        }
    };

    const handleMultipleUpload = async (files) => {
        try {
            const formData = new FormData();
            files.forEach(file => {
                formData.append('files', file);
            });

            const response = await fetch('/api/upload/multiple', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            console.log('Multiple upload successful:', data);

            // Refresh files list
            await fetchFiles();
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.message);
        }
    };

    const handleDeleteFile = async (filename) => {
        try {
            const response = await fetch(`/api/upload/${filename}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Delete failed');
            }

            // Refresh files list
            await fetchFiles();
        } catch (err) {
            console.error('Delete error:', err);
            setError(err.message);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="file-manager">
            <div className="file-manager-header">
                <h1>File Manager</h1>
                <p>Upload and manage your files</p>
            </div>

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}

            <div className="upload-section">
                <h2>Upload Files</h2>
                <div className="upload-options">
                    <div className="upload-option">
                        <h3>Single File Upload</h3>
                        <FileUpload
                            onUpload={handleSingleUpload}
                            accept="image/*"
                        />
                    </div>
                    <div className="upload-option">
                        <h3>Multiple Files Upload</h3>
                        <FileUpload
                            onMultipleUpload={handleMultipleUpload}
                            multiple={true}
                            accept="*/*"
                        />
                    </div>
                </div>
            </div>

            <div className="files-section">
                <h2>Uploaded Files ({files.length})</h2>
                {files.length === 0 ? (
                    <div className="no-files">
                        <p>No files uploaded yet</p>
                    </div>
                ) : (
                    <div className="files-grid">
                        {files.map((file, index) => (
                            <div key={index} className="file-card">
                                <div className="file-info">
                                    <h4>{file.filename}</h4>
                                    <p>Size: {formatFileSize(file.size)}</p>
                                    <p>Uploaded: {formatDate(file.createdAt)}</p>
                                </div>
                                <div className="file-actions">
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary btn-sm"
                                    >
                                        View
                                    </a>
                                    <button
                                        onClick={() => handleDeleteFile(file.filename)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileManager;
