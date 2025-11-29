const Department = require('../models/Department');

// @desc    Create a new department
// @route   POST /api/departments
// @access  Private (Admin/Bishop)
const createDepartment = async (req, res) => {
    try {
        const { name, head, description, parentDepartment } = req.body;
        const department = await Department.create({
            name,
            head,
            description,
            parentDepartment
        });
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('head', 'firstName lastName email').populate('parentDepartment', 'name');
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private (Admin)
const updateDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDepartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private (Admin)
const deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        await department.deleteOne();
        res.json({ message: 'Department removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment
};
