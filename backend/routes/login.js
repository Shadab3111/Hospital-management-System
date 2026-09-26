// backend/routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Admin = require('../models/Admin');

router.post('/', async (req, res) => {
    const { email, password, role } = req.body;

    console.log('Received login request:', { email, role });

    try {
        let user;
        if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        } else if (role === 'admin') {
            user = await Admin.findOne({ email });
        } else {
            user = await User.findOne({ email, role: 'patient' });
        }

        if (!user) {
            console.log('Login failed: User not found for email and role');
            return res.status(400).json({ error: 'Invalid email or role selection' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Login failed: Password mismatch');
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role || role },
            'your_jwt_secret',
            { expiresIn: '30d' } // Extended to 30 days for persistent login
        );

        return res.json({
            token: token,
            role: user.role || role,
            message: "Login successful!"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;