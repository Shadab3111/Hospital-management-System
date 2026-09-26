const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Admin = require('../models/Admin');

router.post('/', async (req, res) => {
    console.log('Signup Request Body:', req.body);
    const { firstName, lastName, email, password, role, specialty, licenseNumber, phoneNumber } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        const userExists = await User.findOne({ email });
        const doctorExists = await Doctor.findOne({ email });
        const adminExists = await Admin.findOne({ email });

        if (userExists || doctorExists || adminExists) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        let newUser;
        if (role === 'doctor') {
            if (!specialty || !licenseNumber || !phoneNumber) {
                return res.status(400).json({ message: "Specialty, License Number, and Phone are required for Doctors!" });
            }
            newUser = new Doctor({ firstName, lastName, email, password, specialty, licenseNumber, phoneNumber, role: 'doctor' });
        } else if (role === 'admin') {
            newUser = new Admin({ firstName, lastName, email, password, role: 'admin' });
        } else {
            if (!phoneNumber) {
                return res.status(400).json({ message: "Phone number is required for Patients!" });
            }
            newUser = new User({ firstName, lastName, email, password, phoneNumber, role: 'patient' });
        }

        await newUser.save();
        console.log('User created successfully:', email);
        res.status(201).json({ message: "Account created successfully!" });
    } catch (err) {
        console.error('Signup Error:', err);
        let errorMsg = err.message;
        if (err.code === 11000) {
            errorMsg = "Email or License Number already exists!";
        }
        res.status(400).json({ message: errorMsg });
    }
});

module.exports = router;