const Report = require('../models/Report');

// @desc    Create a new report
// @route   POST /api/reports
// @access  Private (Dept Leader)
const createReport = async (req, res) => {
    try {
        const { department, periodStart, periodEnd, type, attendanceCount, attendanceList, summary, media } = req.body;

        const report = await Report.create({
            department,
            submittedBy: req.user._id,
            periodStart,
            periodEnd,
            type,
            attendanceCount,
            attendanceList,
            summary,
            media
        });

        // Notify Admins/Bishop
        const User = require('../models/User');
        const sendEmail = require('../utils/emailService');

        const recipients = await User.find({ role: { $in: ['BISHOP', 'ADMIN', 'REVEREND'] } });

        if (recipients.length > 0) {
            const emails = recipients.map(user => user.email);
            const message = `
        <h3>New Report Submitted</h3>
        <p><strong>${req.user.firstName} ${req.user.lastName}</strong> has submitted a ${type} report for Department ID: ${department}.</p>
        <p>Summary: ${summary}</p>
        <p>Attendance: ${attendanceCount}</p>
      `;

            try {
                for (const email of emails) {
                    await sendEmail({
                        email: email,
                        subject: `New ${type} Report Submitted`,
                        html: message
                    });
                }
            } catch (emailError) {
                console.error('Report notification failed:', emailError);
            }
        }

        res.status(201).json(report);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get reports for a department
// @route   GET /api/reports/department/:deptId
// @access  Private
const getDepartmentReports = async (req, res) => {
    try {
        const reports = await Report.find({ department: req.params.deptId })
            .populate('submittedBy', 'firstName lastName')
            .populate('media')
            .sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all reports (for Bishop/Admins)
// @route   GET /api/reports
// @access  Private (Admin/Bishop)
const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find()
            .populate('department', 'name')
            .populate('submittedBy', 'firstName lastName')
            .sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReport,
    getDepartmentReports,
    getAllReports
};
