const SickRecord = require('../models/SickRecord');

// @desc    Create a new sick record
// @route   POST /api/sick-records
// @access  Private
const createSickRecord = async (req, res) => {
    try {
        const { patientName, condition, hospital, admissionDate, status, notes } = req.body;

        const sickRecord = await SickRecord.create({
            patientName,
            condition,
            hospital,
            admissionDate,
            status,
            notes,
            reportedBy: req.user._id
        });

        res.status(201).json(sickRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all sick records
// @route   GET /api/sick-records
// @access  Private
const getSickRecords = async (req, res) => {
    try {
        // If admin, return all. If not, maybe filter? For now, let's return all for authorized roles.
        // The blueprint says Bishop/Rev/Overseer/Admin can view.
        const sickRecords = await SickRecord.find().populate('reportedBy', 'firstName lastName');
        res.status(200).json(sickRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single sick record
// @route   GET /api/sick-records/:id
// @access  Private
const getSickRecordById = async (req, res) => {
    try {
        const sickRecord = await SickRecord.findById(req.params.id).populate('reportedBy', 'firstName lastName');

        if (!sickRecord) {
            return res.status(404).json({ message: 'Sick record not found' });
        }

        res.status(200).json(sickRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update sick record
// @route   PUT /api/sick-records/:id
// @access  Private
const updateSickRecord = async (req, res) => {
    try {
        const sickRecord = await SickRecord.findById(req.params.id);

        if (!sickRecord) {
            return res.status(404).json({ message: 'Sick record not found' });
        }

        // Update fields
        const updatedRecord = await SickRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createSickRecord,
    getSickRecords,
    getSickRecordById,
    updateSickRecord
};
