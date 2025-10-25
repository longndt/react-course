import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import './FileManager.css';

interface FileItem {
    filename: string;
    url: string;
    size: number;
    createdAt: string;
    modifiedAt: string;
}

const FileManager: React.FC = () => {
    const { token } = useAuth();
    const [files, setFiles] = useState<FileItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFiles = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/upload/files`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.success) {
                setFiles(result.data.files);
            } else {
                setError(result.error || 'Failed to fetch files');
            }
        } catch (err) {
            setError('Failed to fetch files');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUploadSuccess = (newFiles: any[]) => {
        // Refresh the file list
        fetchFiles();
    };

    const handleDeleteFile = async (filename: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/upload/${filename}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.success) {
                setFiles(prev => prev.filter(file => file.filename !== filename));
            } else {
                setError(result.error || 'Failed to delete file');
            }
        } catch (err) {
            setError('Failed to delete file');
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
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

            <div className="file-manager-content">
                <div className="upload-section">
                    <h2>Upload Files</h2>
                    <FileUpload
                        onUploadSuccess={handleUploadSuccess}
                        multiple={true}
                        maxFiles={10}
                    />
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="files-section">
                    <h2>Your Files ({files.length})</h2>

                    {files.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📁</div>
                            <p>No files uploaded yet</p>
                            <p className="empty-hint">Upload some files using the form above</p>
                        </div>
                    ) : (
                        <div className="files-grid">
                            {files.map((file, index) => (
                                <div key={index} className="file-card">
                                    <div className="file-preview">
                                        {file.filename.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                            <img
                                                src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}${file.url}`}
                                                alt={file.filename}
                                                className="file-image"
                                            />
                                        ) : (
                                            <div className="file-icon">
                                                {file.filename.match(/\.pdf$/i) ? '📄' :
                                                    file.filename.match(/\.(doc|docx)$/i) ? '📝' :
                                                        file.filename.match(/\.txt$/i) ? '📄' : '📁'}
                                            </div>
                                        )}
                                    </div>

                                    <div className="file-details">
                                        <h3 className="file-name" title={file.filename}>
                                            {file.filename}
                                        </h3>
                                        <p className="file-size">{formatFileSize(file.size)}</p>
                                        <p className="file-date">
                                            Uploaded: {formatDate(file.createdAt)}
                                        </p>
                                    </div>

                                    <div className="file-actions">
                                        <a
                                            href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}${file.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="action-button view-button"
                                        >
                                            View
                                        </a>
                                        <button
                                            onClick={() => handleDeleteFile(file.filename)}
                                            className="action-button delete-button"
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
        </div>
    );
};

export default FileManager;
