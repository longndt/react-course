import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import api from '../services/api';
import './FileManager.css';

const FileManager = () => {
    const { user } = useAuth();
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/upload/files');
            setFiles(response.data.data.files || []);
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSingleUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload successful:', response.data);
            setSuccess('File uploaded successfully!');
            setError(null);

            // Refresh files list
            await fetchFiles();
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.response?.data?.error || err.message);
        }
    };

    const handleMultipleUpload = async (uploadFiles) => {
        try {
            const formData = new FormData();
            uploadFiles.forEach(file => {
                formData.append('files', file);
            });

            const response = await api.post('/upload/multiple', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Multiple upload successful:', response.data);
            setSuccess(`${uploadFiles.length} files uploaded successfully!`);
            setError(null);

            // Refresh files list
            await fetchFiles();
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.response?.data?.error || err.message);
        }
    };

    const handleDeleteFile = async (filename) => {
        try {
            await api.delete(`/upload/${filename}`);
            setSuccess('File deleted successfully!');
            setError(null);

            // Refresh files list
            await fetchFiles();
        } catch (err) {
            console.error('Delete error:', err);
            setError(err.response?.data?.error || err.message);
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
            {success && (
                <Toast
                    message={success}
                    type="success"
                    isVisible={!!success}
                    onClose={() => setSuccess(null)}
                    duration={3000}
                />
            )}

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
