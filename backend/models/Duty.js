const mongoose = require('mongoose');

const DutySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dueDate: Date,
    status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], default: 'PENDING' },
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' }
}, { timestamps: true });

module.exports = mongoose.model('Duty', DutySchema);
