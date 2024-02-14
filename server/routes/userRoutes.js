const express = require('express');
const router=express.Router();
const User=require('../models/userModel');
const bcrypt=require('bcrypt')
router.post('/register', async (req, res) => {
    try {
        const { username, password,contact,email } = req.body;
        
        const existingUser = await User.findOne({ contact });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
       
        const hashedPassword = await bcrypt.hash(password, 10);
       
         let newUser=await User.create({
            username,
            email,
            contact,
            password: hashedPassword,
            
        })
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const { contact, password } = req.body;
        const user = await User.findOne({ contact });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.status(200).json({ message:"User login successful"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports=router;