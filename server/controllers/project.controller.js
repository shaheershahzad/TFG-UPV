const projectModel = require("../models/project.model");
const projectController = {};

projectController.getProjects = async (req, res) => {
    const projects = await projectModel.find();
    res.json(projects);
};

projectController.createProject = async (req, res) => {
    const project = new projectModel({
        name: req.body.name,
        description: req.body.description
    });
    await project.save();
    res.json({
        "status":"Project saved"
    });
};

projectController.getProject = async (req, res) => {
    const project = await projectModel.findById(req.params.id);
    res.json(project);
};

projectController.updateProject = async (req, res) => {
    const project = {
        name: req.body.name,
        description: req.body.description
    }
    await projectModel.findByIdAndUpdate(req.params.id, {$set: project}, { new: true});
    res.json({
        "status":"Project updated"
    });
};

projectController.deleteProject = async (req, res) => {
    await projectModel.findByIdAndRemove(req.params.id);
    res.json({
        "status":"Project deleted"
    });
};

module.exports = projectController;