const FileUpload = require('../models/FileUpload');
const { generateSignedUrl } = require('../services/s3Service');

// @desc    Get signed URL for a file
// @route   GET /api/files/:id/signed-url
// @access  Private
const getSignedUrl = async (req, res) => {
    try {
        const fileUpload = await FileUpload.findById(req.params.id);

        if (!fileUpload) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Generate signed URL (expires in 1 hour by default)
        const signedUrl = await generateSignedUrl(fileUpload.key);

        res.status(200).json({
            signedUrl,
            originalName: fileUpload.originalName,
            fileType: fileUpload.fileType,
            expiresIn: 3600 // 1 hour in seconds
        });
    } catch (error) {
        console.error('Error getting signed URL:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get file details with signed URL
// @route   GET /api/files/:id
// @access  Private
const getFileById = async (req, res) => {
    try {
        const fileUpload = await FileUpload.findById(req.params.id);

        if (!fileUpload) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Generate signed URL
        const signedUrl = await generateSignedUrl(fileUpload.key);

        res.status(200).json({
            ...fileUpload.toObject(),
            signedUrl
        });
    } catch (error) {
        console.error('Error getting file:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSignedUrl,
    getFileById
};
