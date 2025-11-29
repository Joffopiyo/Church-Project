const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUsersByRole,
    getUserById,
    deleteUser,
    updateUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('ADMIN'), getAllUsers);

router.route('/role/:role')
    .get(protect, authorize('ADMIN'), getUsersByRole);

router.route('/:id')
    .get(protect, authorize('ADMIN'), getUserById)
    .put(protect, authorize('ADMIN'), updateUser)
    .delete(protect, authorize('ADMIN'), deleteUser);

module.exports = router;
