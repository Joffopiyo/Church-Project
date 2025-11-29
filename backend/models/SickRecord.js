const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SickRecordSchema = new Schema({
    patientName: { type: String, required: true },
    condition: String,
    hospital: String,
    admissionDate: Date,
    dischargeDate: Date,
    status: { type: String, enum: ['ADMITTED', 'DISCHARGED', 'RECOVERING', 'CRITICAL'], default: 'ADMITTED' },
    documents: [{ type: Schema.Types.ObjectId, ref: 'FileUpload' }],
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('SickRecord', SickRecordSchema);
