import express = require("express");
const authController = require("../controllers/auth.controller");
const jwt = require('jsonwebtoken');

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.body.user = 'User'
    next()
}

//Use json web token node module to validate access tokens and get encrypted user data
const authenticateToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers['authorization'];
    const user = req.body.user;
    const token = authHeader && authHeader.split(' ')[1];
    let loggedOut: boolean = await authController.confirmLoggedOut();
    if (!loggedOut) {
        if (token == null) {
            return res.status(401).send({ message: "Missing access token. Pass it in the headers: Auth section. In this format: 'Bearer sdfweuwe324wrw324sxs...'" });
        } else {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
                if (err) return res.status(403).send({ message: "Please login first", err });
                req.body.user = user

                next();
            });
        }
    } else {
        return res.status(403).send({ message: "Please Log in", success: false });
    }
}

module.exports = authenticateToken