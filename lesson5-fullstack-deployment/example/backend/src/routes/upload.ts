import express from 'express';
import { protect } from '../middleware/auth.js';
import { uploadConfig } from '../config/upload.js';
import {
    uploadSingle,
    uploadMultiple,
    getFiles,
    deleteFile,
} from '../controllers/uploadController.js';

const router = express.Router();

// @desc    Upload single file
// @route   POST /api/upload
// @access  Private
router.post('/', protect, uploadConfig.single('file'), uploadSingle);

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
// @access  Private
router.post('/multiple', protect, uploadConfig.array('files', 10), uploadMultiple);

// @desc    Get all uploaded files
// @route   GET /api/upload/files
// @access  Private
router.get('/files', protect, getFiles);

// @desc    Delete file
// @route   DELETE /api/upload/:filename
// @access  Private
router.delete('/:filename', protect, deleteFile);

export default router;