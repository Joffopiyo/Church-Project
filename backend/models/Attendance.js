const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    date: { type: Date, required: true, index: true },
    type: { type: String, enum: ['SUNDAY_SERVICE', 'MIDWEEK', 'SPECIAL'], required: true },
    totalMen: { type: Number, default: 0 },
    totalWomen: { type: Number, default: 0 },
    totalChildren: { type: Number, default: 0 },
    totalCount: { type: Number, required: true },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
