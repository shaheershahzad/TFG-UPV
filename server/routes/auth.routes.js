const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

module.exports = (router) => {
    router.post("/register", authController.createUser);
    router.post("/login", authController.loginUser);
};