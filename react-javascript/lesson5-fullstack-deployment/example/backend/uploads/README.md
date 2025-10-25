# Uploads Directory

This directory stores uploaded files (images, documents, etc.).

## File Types Supported
- Images: `.jpg`, `.jpeg`, `.png`, `.gif`
- Documents: `.pdf`, `.doc`, `.docx`, `.txt`

## File Size Limit
- Maximum: 5MB per file

## Note
- Files are automatically saved here by Multer middleware
- Each file has a unique timestamp-based name to prevent conflicts
- Files are served statically via `/uploads` route

