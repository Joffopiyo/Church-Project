const Duty = require('../models/Duty');

// @desc    Assign a duty
// @route   POST /api/duties
// @access  Private (Leaders)
const createDuty = async (req, res) => {
    try {
        const { title, description, assignedTo, dueDate, priority } = req.body;
        const duty = await Duty.create({
            title,
            description,
            assignedTo,
            assignedBy: req.user._id,
            dueDate,
            priority
        });

        // Fetch assignee email and send notification
        const User = require('../models/User');
        const assignee = await User.findById(assignedTo);
        const sendEmail = require('../utils/emailService');

        if (assignee) {
            const message = `
        <h3>New Duty Assigned</h3>
        <p>You have been assigned a new duty: <strong>${title}</strong></p>
        <p>Description: ${description}</p>
        <p>Due Date: ${new Date(dueDate).toLocaleDateString()}</p>
        <p>Priority: ${priority}</p>
        <p>Assigned By: ${req.user.firstName} ${req.user.lastName}</p>
      `;

            try {
                await sendEmail({
                    email: assignee.email,
                    subject: 'New Duty Assignment - Church App',
                    html: message,
                });
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
            }
        }

        res.status(201).json(duty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get duties assigned TO the logged in user
// @route   GET /api/duties/my
// @access  Private
const getMyDuties = async (req, res) => {
    try {
        const duties = await Duty.find({ assignedTo: req.user._id })
            .populate('assignedBy', 'firstName lastName')
            .sort({ dueDate: 1 });
        res.json(duties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get duties assigned BY the logged in user
// @route   GET /api/duties/assigned
// @access  Private
const getAssignedDuties = async (req, res) => {
    try {
        const duties = await Duty.find({ assignedBy: req.user._id })
            .populate('assignedTo', 'firstName lastName')
            .sort({ createdAt: -1 });
        res.json(duties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update duty status
// @route   PUT /api/duties/:id/status
// @access  Private (Assigned User)
const updateDutyStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const duty = await Duty.findById(req.params.id);

        if (!duty) {
            return res.status(404).json({ message: 'Duty not found' });
        }

        if (duty.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this duty' });
        }

        duty.status = status;
        await duty.save();
        res.json(duty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createDuty,
    getMyDuties,
    getAssignedDuties,
    updateDutyStatus
};
