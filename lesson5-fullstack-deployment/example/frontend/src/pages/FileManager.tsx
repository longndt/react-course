import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';

interface FileItem {
    filename: string;
    size: number;
    created: string;
    modified: string;
}

const FileManager: React.FC = () => {
    const { user } = useAuth();
    const [files, setFiles] = useState<FileItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/upload/files', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch files');
            }

            const data = await response.json();
            setFiles(data.data.files || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSingleUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            setSuccess('File uploaded successfully!');
            setError(null);
            await fetchFiles();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleMultipleUpload = async (uploadFiles: File[]) => {
        try {
            const formData = new FormData();
            uploadFiles.forEach(file => {
                formData.append('files', file);
            });

            const response = await fetch('/api/upload/multiple', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            setSuccess(`${uploadFiles.length} files uploaded successfully!`);
            setError(null);
            await fetchFiles();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleDeleteFile = async (filename: string) => {
        try {
            const response = await fetch(`/api/upload/${filename}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Delete failed');
            }

            setSuccess('File deleted successfully!');
            setError(null);
            await fetchFiles();
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="file-manager">
            {success && (
                <div className="toast" onClick={() => setSuccess(null)}>
                    {success}
                </div>
            )}

            {error && (
                <div className="toast error" onClick={() => setError(null)}>
                    {error}
                </div>
            )}

            <div className="header">
                <h1>File Manager</h1>
                <p>Welcome, {user?.name}! Manage your files here.</p>
            </div>

            <FileUpload
                onSingleUpload={handleSingleUpload}
                onMultipleUpload={handleMultipleUpload}
                isLoading={isLoading}
            />

            <div className="file-list">
                {files.map((file, index) => (
                    <div key={index} className="file-item">
                        <h4>{file.filename}</h4>
                        <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                        <p>Created: {new Date(file.created).toLocaleDateString()}</p>
                        <button
                            onClick={() => handleDeleteFile(file.filename)}
                            className="btn btn-secondary"
                            style={{ marginTop: '0.5rem' }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileManager;