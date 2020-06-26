const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project.controller");

module.exports = (router) => {
    router.post("/", projectController.createProject);
    router.get("/", projectController.getProjects);
};