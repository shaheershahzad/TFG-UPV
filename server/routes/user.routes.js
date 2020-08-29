const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

module.exports = (router) => {
    router.post("/register", userController.createUser);
    router.post("/register/save", userController.saveUser);
    router.post("/login", userController.loginUser);
    router.get("/recover-password", userController.sendResetEmail);
    router.put("/reset-password", userController.resetPassword);
    router.get("/info", userController.getUser);
    router.get("/", userController.getUsers);
    router.get("/workers", userController.getWorkers);
};