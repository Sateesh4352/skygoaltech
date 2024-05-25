const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) throw new Error('User not found.');
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('Invalid credentials.');

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;
