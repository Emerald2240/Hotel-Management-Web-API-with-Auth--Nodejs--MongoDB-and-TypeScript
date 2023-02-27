"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const constants_1 = __importDefault(require("../constants"));
function database() {
    console.log("connecting to DB...");
    mongoose
        .set('strictQuery', true)
        .connect(constants_1.default.DATABASE_URI, {
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // userUnifiedTopology:true,
    })
        .then(() => {
        console.log("Yay! Database Connected Successfully");
    })
        .catch((err) => {
        console.log("There was an error while connecting to the database.");
    });
}
module.exports = database;
