import express from 'express';
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
import jwt from 'jsonwebtoken';
const authenticateToken = require('../middlewares/auth.middleware');

//CREATE
userRouter.post("/", userController.signUp);

//READ
userRouter.get("/", authenticateToken, userController.fetchAllUsers);
userRouter.get("/:email", authenticateToken, userController.fetchUser);

//UPDATE
userRouter.patch("/:email", authenticateToken, userController.updateUserProfile);

//DELETE
userRouter.delete("/:email", authenticateToken, userController.deleteUserAccount);


module.exports = userRouter;