const mongoose = require('mongoose');

const FileUploadSchema = new mongoose.Schema({
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    key: { type: String, required: true }, // S3 Key
    url: { type: String, required: true },
    fileType: { type: String, enum: ['IMAGE', 'DOCUMENT', 'VIDEO'], required: true },
    durationSeconds: { type: Number }, // For videos
    thumbnailUrl: { type: String }, // For videos
    relatedEntity: { type: mongoose.Schema.Types.ObjectId, refPath: 'onModel' },
    onModel: { type: String, enum: ['Report', 'Event', 'SickRecord', 'Sermon'] }
}, { timestamps: true });

module.exports = mongoose.model('FileUpload', FileUploadSchema);
