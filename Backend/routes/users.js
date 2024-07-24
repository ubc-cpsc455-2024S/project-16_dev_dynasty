const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
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
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 1000 });
        res.status(201).json({ result: user });
    } catch (error) {
        console.log("the error caught was: ", error);
        res.status(500).json({ serverError: error.message });
    }
});

router.get("/logout", async (req, res, next) => {
    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
    res.status(200).json({ message: 'user is logged out' });
});

module.exports = router;