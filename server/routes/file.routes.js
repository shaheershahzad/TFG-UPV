const express = require("express");
const router = express.Router();

const fileController = require("../controllers/file.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", fileController.getFiles);
    router.post("/", fileController.createFiles);
    router.get("/:id", fileController.getFile);
    router.get("/project/:id", fileController.getProjectFiles);
    router.put("/:id", fileController.updateFile);
    router.delete("/:id", fileController.deleteFile);
    router.delete("/project/:id", fileController.deleteProjectFiles);
//};
module.exports = router;