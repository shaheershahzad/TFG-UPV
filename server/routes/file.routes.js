const express = require("express");
const router = express.Router();

const fileController = require("../controllers/file.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", fileController.getFiles);
    router.post("/", fileController.createFile);
    router.get("/:id", fileController.getFile);
    router.put("/:id", fileController.updateFile);
    router.delete("/:id", fileController.deleteFile);
//};
module.exports = router;