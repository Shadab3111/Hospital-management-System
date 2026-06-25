// backend/routes/signup.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Password encrypt karne ke liye
const User = require('../models/User'); // Aapka main User model

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        // 1. Check karein ki user pehle se register toh nahi hai
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        // 2. Password ko encrypt/hash karein
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Naya user banayein hashed password ke sath
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword, // Encrypted password save ho raha hai
            role: role || 'patient'
        });

        await newUser.save();
        res.status(201).json({ message: "Account created successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;