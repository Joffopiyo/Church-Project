const Attendance = require('../models/Attendance');

// @desc    Record daily attendance
// @route   POST /api/attendance
// @access  Private (Staff/Leaders)
const recordAttendance = async (req, res) => {
    try {
        const { date, type, totalMen, totalWomen, totalChildren, notes } = req.body;

        const totalCount = parseInt(totalMen) + parseInt(totalWomen) + parseInt(totalChildren);

        const attendance = await Attendance.create({
            date,
            type,
            totalMen,
            totalWomen,
            totalChildren,
            totalCount,
            recordedBy: req.user._id,
            notes
        });

        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get attendance history
// @route   GET /api/attendance
// @access  Private
const getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .sort({ date: -1 })
            .populate('recordedBy', 'firstName lastName');
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    recordAttendance,
    getAttendance
};
