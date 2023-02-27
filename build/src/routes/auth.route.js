"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authRouter = express.Router();
const constants_1 = __importDefault(require("../constants"));
const { MESSAGES } = constants_1.default;
const authController = require("../controllers/auth.controller");
authRouter.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});
authRouter.get("/token", authController.refreshAccessToken);
authRouter.post("/login", authController.login);
authRouter.delete("/logout", authController.logout);
module.exports = authRouter;
