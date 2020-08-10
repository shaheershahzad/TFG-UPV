const express = require("express");
const router = express.Router();

const user2Controller = require("../controllers/user2.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", user2Controller.getUsers);
    router.post("/", user2Controller.createUser);
    router.get("/user-details/:id", user2Controller.getUser);
    //router.put("/:id", user2Controller.updateUser);
    router.delete("/:id", user2Controller.deleteUser);
    router.put("/reset-password", user2Controller.resetPassword);
//};
module.exports = router;