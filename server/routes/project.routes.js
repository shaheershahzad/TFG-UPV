const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", projectController.getProjects);
    router.post("/", projectController.createProject);
    router.get("/:id", projectController.getProject);
    router.put("/:id", projectController.updateProject);
    router.get("/:idProject/volunteers/:idVolunteer", projectController.checkVolunteer);
    router.put("/volunteer/add/:id", projectController.addVolunteer);
    router.put("/volunteer/remove/:id", projectController.removeVolunteer);
    router.delete("/:id", projectController.deleteProject);
    router.get("/project/details/:id", projectController.getProjectDetails);
//};
module.exports = router;