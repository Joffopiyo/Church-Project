const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // e.g., "Home Base Fellowship", "Choir"
    head: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: String,
    parentDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' } // For hierarchy
}, { timestamps: true });

module.exports = mongoose.model('Department', DepartmentSchema);
