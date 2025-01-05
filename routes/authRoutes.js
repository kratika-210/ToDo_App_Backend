const express=require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User=require('../models/User')
const router=express.Router();

require('dotenv').config();
const jwt_secret=process.env.jwt_secret;


// API to register of user
router.post('/register',async(req,res)=>{
    try{
        const {username, password} =req.body;

        const existingUser= await User.findOne({username});
        if (existingUser) return res.status(400).json({ error: 'User already exists.' });

        const user=new User({username, password});
        user.save();
        res.status(201).json({ message: 'User registered successfully.' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
});

// API to login user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid username or password.' });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid username or password.' });

        // Generate JWT
        const token = jwt.sign({ id: user._id }, jwt_secret); 
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;