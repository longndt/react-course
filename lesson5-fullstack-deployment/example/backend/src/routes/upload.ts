import express from 'express';
import { uploadSingle, uploadMultiple } from '../config/upload.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Upload single file
// @route   POST /api/upload
// @access  Private
router.post('/', protect, uploadSingle, (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No file uploaded'
            });
        }

        res.json({
            success: true,
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                path: req.file.path,
                size: req.file.size,
                mimetype: req.file.mimetype,
                url: `/uploads/${req.file.filename}`
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Upload failed'
        });
    }
});

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
// @access  Private
router.post('/multiple', protect, uploadMultiple, (req, res) => {
    try {
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No files uploaded'
            });
        }

        const uploadedFiles = files.map(file => ({
            filename: file.filename,
            originalName: file.originalname,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
            url: `/uploads/${file.filename}`
        }));

        res.json({
            success: true,
            data: {
                files: uploadedFiles,
                count: uploadedFiles.length
            }
        });
    } catch (error) {
        console.error('Multiple upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Upload failed'
        });
    }
});

// @desc    Get uploaded files list
// @route   GET /api/upload/files
// @access  Private
router.get('/files', protect, (req, res) => {
    try {
        const fs = require('fs');
        const path = require('path');
        const uploadDir = 'uploads';

        if (!fs.existsSync(uploadDir)) {
            return res.json({
                success: true,
                data: { files: [] }
            });
        }

        const files = fs.readdirSync(uploadDir).map(filename => {
            const filePath = path.join(uploadDir, filename);
            const stats = fs.statSync(filePath);

            return {
                filename,
                url: `/uploads/${filename}`,
                size: stats.size,
                createdAt: stats.birthtime,
                modifiedAt: stats.mtime
            };
        });

        res.json({
            success: true,
            data: { files }
        });
    } catch (error) {
        console.error('Get files error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get files'
        });
    }
});

// @desc    Delete file
// @route   DELETE /api/upload/:filename
// @access  Private
router.delete('/:filename', protect, (req, res) => {
    try {
        const fs = require('fs');
        const path = require('path');
        const filename = req.params.filename;
        const filePath = path.join('uploads', filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                error: 'File not found'
            });
        }

        fs.unlinkSync(filePath);

        res.json({
            success: true,
            message: 'File deleted successfully'
        });
    } catch (error) {
        console.error('Delete file error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete file'
        });
    }
});

export default router;
