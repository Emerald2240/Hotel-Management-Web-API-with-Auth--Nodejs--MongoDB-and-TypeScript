import express = require('express');
const userService = require('../services/user.service');
import constants from "../constants";
const { MESSAGES } = constants;
const joi = require('joi');

class UserController {

    async getStatus(req: express.Request, res: express.Response) {
        res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
    };

    //Create a new user
    async signUp(req: express.Request, res: express.Response) {

        //verify user entries with JOI
        const joiSchema = joi.object({
            first_name: joi.string()
                .min(3)
                .max(200)
                .required(),

            last_name: joi.string()
                .min(3)
                .max(200)
                .required(),

            email: joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),

            password: joi.string()
                .min(5)
                .max(200)
                .required(),

            user_type: joi.string()
                .min(4)//user
                .max(5)//admin
                .required()
        });
        try {
            const validBody = await joiSchema.validateAsync(req.body);
            const data = await userService.createUser(req.body);
            res
                .status(201)
                .send({ message: MESSAGES.CREATED, success: true, data });


        } catch (err: any) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //get user from the database, using their email
    async fetchUser(req: express.Request, res: express.Response) {
        try {
            const data = await userService.getUser(req.params.email);

            if (data) {
                res
                    .status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }
        } catch (err: any) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //get all users in the user collection/table
    async fetchAllUsers(req: express.Request, res: express.Response) {
        try {
            const data = await userService.getAllUsers();

            if (data) {
                res
                    .status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }
        } catch (err: any) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Update/edit user data
    async updateUserProfile(req: express.Request, res: express.Response) {
        try {
            const data = await userService.updateUserByEmail(req.params.email, req.body);
            if (data) {
                res
                    .status(201)
                    .send({ message: MESSAGES.UPDATED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }
        } catch (err: any) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Delete user account entirely from the database
    async deleteUserAccount(req: express.Request, res: express.Response) {
        try {
            const data = await userService.deleteUser(req.params.email);
            if (data) {
                res
                    .status(201)
                    .send({ message: MESSAGES.DELETED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }

        } catch (err: any) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

}

module.exports = new UserController();