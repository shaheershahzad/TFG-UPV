const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", projectController.getProjects);
    router.post("/", projectController.createProject);
    router.get("/:id", projectController.getProject);
    router.put("/:id", projectController.updateProject);
    router.delete("/:id", projectController.deleteProject);
//};
module.exports = router;