const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const FileUpload = require('../models/FileUpload');
const { generateSignedUrl } = require('../services/s3Service');

// Configure S3
const s3 = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Multer S3 Storage
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const filename = `${uuidv4()}${ext}`;
            // Organize by year/month/type
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const type = file.mimetype.startsWith('image') ? 'images' : file.mimetype.startsWith('video') ? 'videos' : 'docs';

            cb(null, `${process.env.NODE_ENV}/${type}/${year}/${month}/${filename}`);
        },
    }),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Check File Type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx|mp4|mov/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images, Docs, and Videos Only!');
    }
}

// @desc    Upload file
// @route   POST /api/upload
// @access  Private
const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const fileType = req.file.mimetype.startsWith('image')
            ? 'IMAGE'
            : req.file.mimetype.startsWith('video')
                ? 'VIDEO'
                : 'DOCUMENT';

        const fileUpload = await FileUpload.create({
            uploader: req.user._id,
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            key: req.file.key,
            url: req.file.location, // S3 URL (may not work if bucket is private)
            fileType: fileType,
        });

        // Generate signed URL for immediate access
        const signedUrl = await generateSignedUrl(req.file.key);

        res.status(201).json({
            ...fileUpload.toObject(),
            signedUrl
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    upload,
    uploadFile
};
