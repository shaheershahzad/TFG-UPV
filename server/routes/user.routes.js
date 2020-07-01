const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

module.exports = (router) => {
    router.post("/register", userController.createUser);
    router.post("/login", userController.loginUser);
};