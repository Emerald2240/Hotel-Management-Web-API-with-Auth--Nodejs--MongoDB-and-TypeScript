"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//If the user is not an admin, stop them from moving further
const adminAuthorization = (req, res, next) => {
    if (req.body.user.user_type === "admin") {
        next();
    }
    else {
        res.status(403).send({ message: "You are unauthorized to perform this operation" });
    }
};
module.exports = adminAuthorization;
