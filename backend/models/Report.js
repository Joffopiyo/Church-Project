const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true, index: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
    type: { type: String, enum: ['WEEKLY', 'MONTHLY', 'EVENT'], required: true },
    attendanceCount: { type: Number, default: 0 },
    attendanceList: [{ type: String }], // Names of attendees
    summary: { type: String },
    media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FileUpload' }], // Photos/Docs
    status: { type: String, enum: ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'], default: 'DRAFT' },
    feedback: String
}, { timestamps: true });

ReportSchema.index({ department: 1, periodStart: -1 });
module.exports = mongoose.model('Report', ReportSchema);
