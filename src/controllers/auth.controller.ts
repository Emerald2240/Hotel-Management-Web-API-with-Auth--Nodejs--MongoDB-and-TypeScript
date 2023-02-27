import 'dotenv/config';
import express = require('express');
import constants from "../constants";
const { MESSAGES } = constants;
const authService = require("../services/auth.service");
import joi = require('joi');
import jwt from 'jsonwebtoken';

var user: any = [];
var refreshTokenStore = '';

declare var process: {
    env: {
        DATABASE_URI: string |jwt.Secret;
        ACCESS_TOKEN_SECRET: string | jwt.Secret;
        REFRESH_TOKEN_SECRET: string | jwt.Secret;
        ENV?: 'test' | 'dev' | 'prod';
    }
}

class AuthController {

    //Once a user logs in, an expirable access token and an inexpirable refresh token is provided. This is for security reasons... The refresh token creates a new access token once the former one expires
    async refreshAccessToken(req: express.Request, res: express.Response) {
        const refreshToken = req.body.token;
        if (refreshToken == null) {
            return res.status(401).send({ message: "Missing refresh token body parameter" });
        } else {
            if (refreshTokenStore !== refreshToken) {
                return res.status(403).send({ message: "Invalid token" });
            } else {

                let envRefreshToken = process.env.REFRESH_TOKEN_SECRET;

                //verify if refresh token is valid
                jwt.verify(refreshToken, envRefreshToken, (err: any, user: any) => {
                    if (err) {
                        return res.status(403).send(err);
                    } else {
                        let envAccessToken = process.env.ACCESS_TOKEN_SECRET;
                        //create a new access token
                        const accessToken = jwt.sign(user, envAccessToken, { expiresIn: '10m' });
                        res.json({ accessToken: accessToken });
                    }
                })
            }
        }
    }

    //Takes an email and password in the query body and checks the db if they match
    async login(req: express.Request, res: express.Response) {

        //validate user input with JOI
        const joiSchema = joi.object({

            email: joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),

            password: joi.string()
                .min(5)
                .max(200)
                .required(),
        });

        try {
            const value = await joiSchema.validateAsync({ email: req.body.email, password: req.body.password });

            //pass the data to the login service module
            user = await authService.login(req.body.email, req.body.password);
            console.log(user);
            if (user) {

                //creates new access token and refresh token for the user
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
                refreshTokenStore = refreshToken;
                res.status(200)
                    .json({ message: MESSAGES.LOGGED_IN, accessToken: accessToken, refreshToken: refreshToken });
            } else {
                res.status(403)
                    .send({ message: MESSAGES.LOGIN_FAILURE });
            }

        } catch (err) {
            res.status(418).send({ message: "Invalid credentials" })
        }
    }

    //Deletes the refresh token from the app
    async logout(req: express.Request, res: express.Response) {
        if (refreshTokenStore != '') {
            refreshTokenStore = '';
            res.status(200).send({ message: MESSAGES.LOGOUT, success: true });
        } else {
            res.status(404).send({ message: MESSAGES.LOGIN_FIRST, success: true });
        }
    }

    async confirmLoggedOut(){
        if(refreshTokenStore != ''){
            return false;
        }else{
            return true;
        }
    }
}

module.exports = new AuthController();
