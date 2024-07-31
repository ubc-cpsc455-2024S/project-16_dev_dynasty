const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cookie = require('cookie');
require("dotenv").config();
const {
    signupUser,
} = require("../services/userServices");

const secret = process.env.JWT_SECRET_STR;


router.post("/signup", async (req, res, next) => {
    try {
        const userData = req.body;
        const newUser = await User.create(userData);
        newUser.password = undefined;
        res.status(201).json({ result: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ serverError: error });
    }
});


router.post("/signin", async (req, res, next) => {
    const { name, password } = req.body;
    try {
        const user = await User.login(name, password);
        user.password = undefined;
        const token = jwt.sign(user.toObject(), secret, { expiresIn: 1000 });

        // Serialize the cookie
        const cookieOptions = {
            httpOnly: true,
            maxAge: 1000 * 60 * 60, // 1 hour (adjust as needed)
            path: '/',
            sameSite: 'none', 
            secure: true 
        };

        res.setHeader('Set-Cookie', cookie.serialize('jwt', token, cookieOptions));


        // res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 1000, path: '/'});
        res.status(201).json({ result: user });
    } catch (error) {
        console.log("the error caught was: ", error);
        if (error.message.includes('user does not exist')) {
            return res.status(404).json({ loginError: error.message });
        } else if (error.message.includes('incorrect password')) {
            return res.status(401).json({ loginError: error.message });
        }
        res.status(500).json({ serverError: error.message });
    }
});


// endpoint to verify JWT
router.get("/verify-token", (req, res) => {
    const token = req.cookies.jwt;
    console.log('verifying token and token is: ', token);
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, secret);
        res.status(200).json({ user: decoded });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
});
const pastDate = new Date(0).toUTCString();
router.get("/logout", async (req, res, next) => {

    const cookieOptions = {
        httpOnly: true,
        // expires: pastDate, 
        path: '/',
        maxAge: 1,
        sameSite: 'none',
        secure: true
    };

    res.setHeader('Set-Cookie', cookie.serialize('jwt', '', cookieOptions));
    // res.cookie('jwt', '', { httpOnly: true, maxAge: 2, path: '/'});
    res.status(200).json({ message: 'user is logged out' });
});

module.exports = router;