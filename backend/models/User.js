const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: {
        type: String,
        enum: ['BISHOP', 'REVEREND', 'OVERSEER', 'SENIOR_PASTOR', 'DEPT_LEADER', 'MEMBER', 'ADMIN'],
        default: 'MEMBER',
        index: true
    },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    phoneNumber: { type: String },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    revokedTokens: [{ token: String, revokedAt: Date }] // For manual token revocation
}, { timestamps: true });

// Encrypt password using bcrypt
// Encrypt password using bcrypt
UserSchema.pre('save', async function () {
    if (!this.isModified('passwordHash')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Generate password reset token
UserSchema.methods.getResetPasswordToken = function () {
    const crypto = require('crypto');

    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire (10 minutes)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
