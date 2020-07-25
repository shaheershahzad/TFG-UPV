const fileModel = require("../models/file.model");
const fileController = {};
const fs = require('fs');
const path = require("path");

fileController.getFiles = async (req, res) => {
    const files = await fileModel.find();
    res.json(files);
};

/*fileController.createFile = async (req, res) => {
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
};*/

fileController.createFiles = async (req, res) => {
    console.log(req.body);
    fileModel.create(req.body, function (err, temps) {

        if (err) {
            console.log(err);
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

/*fileController.updateFile = async (req, res) => {
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
};*/

fileController.deleteFile = async (req, res) => {
    const file = [await fileModel.findByIdAndRemove(req.params.id)];
    
    //Borrar los ficheros del servidor
    deleteServerFiles(file, function(err, res1) {
        if (err) {
            console.log(err);
            return res1.status(500).send('Error al borrar los documentos del servidor');
        } else {
            console.log("Todos los ficheros han sido borrados correctamente");
            res.send({
                "status":"File deleted"
            });
        }
    });
};

function deleteServerFiles(files, callback){
    var i = files.length-1;
    let filepath = path.join(__dirname, "../uploads/");
    files.forEach(file => {
        fs.unlink(filepath+file.uploadedName, function(err) {
            i--;
            if (err) {
                callback(err);
                return;
            } else if (i < 0) {
                callback(null);
            }
        });
    });
}

fileController.getProjectFiles = async (req, res) => {
    let filter = {
        "projectId": req.params.id
    }

    const files = await fileModel.find(filter);
    res.json(files);
};

fileController.deleteProjectFiles = async (req, res) => {
    let filter = {
        "projectId": req.params.id
    }
    const files = await fileModel.find(filter, function(err, res1) {
        if(err){
            console.log(err);
            return res1.status(500).send('Error al buscar documentos a borrar');
        }else{
            fileModel.deleteMany(filter, function(err, res2){
                if(err){
                    console.log(err);
                    return res2.status(500).send({
                        "message": "Error al borrar los documentos"
                    });
                }else{
                    console.log("Documentos borrados");
                    res.send({
                        "message": "Documentos borrados"
                    });
                }
            });
        }
    });

    //Borrar los ficheros del servidor
    deleteServerFiles(files, function(err, res) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al borrar los documentos del servidor');
        } else {
            console.log("Todos los ficheros han sido borrados correctamente");
        }
    });
};

module.exports = fileController;