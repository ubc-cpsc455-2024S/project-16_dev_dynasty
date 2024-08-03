const jwt = require('jsonwebtoken');
require("dotenv").config();
const cookie = require('cookie');
const secret = process.env.JWT_SECRET_STR;

const requireLoggin = (req, res, next) => {
    const token = req.cookies.jwt;
    // const cookies = cookie.parse(req.headers.cookie || '');
    // console.log('verifying logining and cookies are: ', cookies);
    // const token = cookies.jwt;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(400).json({ Error: 'incorrect login, please login a gain' });
            } else {
                req.user = decodedToken;
                next();
            }
        })

    } else {
        res.status(401).json({ Error: 'please login for this action' });
    }
};


const requirePermission = (permission) => {
    return (req, res, next) => {
        if (req.user.role !== permission) {
            res.status(401).json({ Error: 'you dont have the authorization for this action' });
        } else {
            next();
        }
    }



};


module.exports = { requireLoggin, requirePermission };