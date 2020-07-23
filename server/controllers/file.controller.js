const fileModel = require("../models/file.model");
const fileController = {};

fileController.getFiles = async (req, res) => {
    const files = await fileModel.find();
    res.json(files);
};

fileController.createFile = async (req, res) => {
    const file = new fileModel({
        name: req.body.name,
        size: req.body.size,
        type: req.body.type,
        projectId: req.body.projectId,
        uploaderId: req.body.uploaderId
    });
    await file.save();
    res.json({
        "status":"File saved"
    });
};

fileController.createFiles = async (req, res) => {
    console.log(req.body);
    fileModel.create(req.body, function (err, temps) {

        if (err) {
            console.log(err);
            // terminate request/response cycle
            return res.send('Error saving');
        }
    
    });
    res.json({
        "status":"Files saved"
    });
};

fileController.getFile = async (req, res) => {
    const file = await fileModel.findById(req.params.id);
    res.json(file);
};

fileController.updateFile = async (req, res) => {
    const file = {
        name: req.body.name,
        size: req.body.size,
        type: req.body.type,
        projectId: req.body.projectId,
        uploaderId: req.body.uploaderId
    }
    await fileModel.findByIdAndUpdate(req.params.id, {$set: file}, { new: true});
    res.json({
        "status":"File updated"
    });
};

fileController.deleteFile = async (req, res) => {
    await fileModel.findByIdAndRemove(req.params.id);
    res.json({
        "status":"File deleted"
    });
};

module.exports = fileController;