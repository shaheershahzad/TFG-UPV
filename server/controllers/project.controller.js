const projectModel = require("../models/project.model");
const projectController = {};

projectController.getProjects = async (req, res) => {
    const projects = await projectModel.find();
    res.json(projects);
};

projectController.createProject = async (req, res) => {
    try {
        const project = new projectModel({
            name: req.body.name,
            description: req.body.description,
            coordinates: req.body.coordinates,
            location: req.body.location
        });
        let p = await project.save();
        res.json({
            "status":"Project saved",
            "id": p._id
        });
    } catch (error) {
        console.log('err' + error);
        res.status(500).send(error);
    }
};

projectController.getProject = async (req, res) => {
    const project = await projectModel.findById(req.params.id);
    res.json(project);
};

projectController.getProjectDetails = async (req, res) => {
    const project = await projectModel.findById(req.params.id);
    res.json(project);
};

projectController.updateProject = async (req, res) => {
    const project = {
        name: req.body.name,
        description: req.body.description,
        //coordinates: req.body.coordinates,
        location: req.body.location
    }
    await projectModel.findByIdAndUpdate(req.params.id, {$set: project}, { new: true });
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