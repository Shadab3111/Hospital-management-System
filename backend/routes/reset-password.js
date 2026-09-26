const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Admin = require('../models/Admin');

// This is a simplified reset password for development
// In production, you would send an OTP or email link
router.post('/', async (req, res) => {
    const { email, role, newPassword } = req.body;

    try {
        let user;
        if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        } else if (role === 'admin') {
            user = await Admin.findOne({ email });
        } else {
            user = await User.findOne({ email });
        }

        if (!user) {
            return res.status(404).json({ error: "User with this email not found in this role" });
        }

        // Updating the password. The model's pre-save hook will hash it.
        user.password = newPassword;
        await user.save();

        res.json({ message: "Password reset successful! You can now login with your new password." });
    } catch (err) {
        console.error("Reset Password Error:", err);
        res.status(500).json({ error: "Server error during password reset" });
    }
});

module.exports = router;
