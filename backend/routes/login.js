// backend/routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); // Agar aapke model ka naam kuch aur hai toh check kar lein

router.post('/', async (req, res) => {
    const { email, password, role } = req.body;

    console.log('Received data:', req.body);

    try {
        // 1. User ko email aur role dono se dhoodhein
        const user = await User.findOne({ email, role });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or role' });
        }

        // 2. Password match karein
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // 3. JWT Token generate karein (Yahan 'token' define ho raha hai)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            'your_jwt_secret', // Aapka secret key
            { expiresIn: '24h' }
        );

        // 4. Response bhein (Ab token undefined nahi bolega)
        return res.json({
            token: token,
            role: user.role,
            message: "Login successful!"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;