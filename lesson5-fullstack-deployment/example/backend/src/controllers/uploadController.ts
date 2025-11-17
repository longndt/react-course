import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

// @desc    Upload single file
// @route   POST /api/upload
// @access  Private
export const uploadSingle = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        res.json({
            success: true,
            data: {
                message: 'File uploaded successfully',
                file: {
                    filename: req.file.filename,
                    originalname: req.file.originalname,
                    size: req.file.size,
                    mimetype: req.file.mimetype,
                    path: req.file.path,
                },
            },
        });
    } catch (error: any) {
        console.error('Upload single error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
// @access  Private
export const uploadMultiple = async (req: Request, res: Response) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const files = Array.isArray(req.files) ? req.files : req.files.files;

        const uploadedFiles = files.map((file: any) => ({
            filename: file.filename,
            originalname: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
            path: file.path,
        }));

        res.json({
            success: true,
            data: {
                message: `${files.length} files uploaded successfully`,
                files: uploadedFiles,
            },
        });
    } catch (error: any) {
        console.error('Upload multiple error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Get all uploaded files
// @route   GET /api/upload/files
// @access  Private
export const getFiles = async (req: Request, res: Response) => {
    try {
        // Use absolute path from project root
        const uploadsDir = path.join(process.cwd(), 'uploads');

        // Check if uploads directory exists
        if (!fs.existsSync(uploadsDir)) {
            return res.json({
                success: true,
                data: {
                    files: [],
                },
            });
        }

        const files = fs.readdirSync(uploadsDir).map(filename => {
            const filePath = path.join(uploadsDir, filename);
            const stats = fs.statSync(filePath);

            return {
                filename,
                size: stats.size,
                created: stats.birthtime,
                modified: stats.mtime,
            };
        });

        res.json({
            success: true,
            data: {
                files,
            },
        });
    } catch (error: any) {
        console.error('Get files error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Delete file
// @route   DELETE /api/upload/:filename
// @access  Private
export const deleteFile = async (req: Request, res: Response) => {
    try {
        const { filename } = req.params;
        // Use absolute path from project root
        const filePath = path.join(process.cwd(), 'uploads', filename);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Delete file
        fs.unlinkSync(filePath);

        res.json({
            success: true,
            data: {
                message: 'File deleted successfully',
            },
        });
    } catch (error: any) {
        console.error('Delete file error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
