const webdataModel = require("../models/webdata.model");
const webdataController = {};

webdataController.addWebdata = async (req, res) => {
    const webdata = new webdataModel({
        title: req.body.title,
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription
    });

    const dataAvailable = await webdataModel.find();

    if(dataAvailable.length > 0){
        return res.status(500).send("Webdata is already available");
    }else{

        webdata.save().then( function() {
            res.json({
                "status":"Webdata saved"
            });
        }, function(err) {
            return res.status(500).send("Error on saving webdata");
            }
        );        
    }
};

webdataController.getWebdata = async (req, res) => {
    const webdata = await webdataModel.find();

    if(webdata.length > 0){
        return res.json(webdata);
    }else{
        return res.status(500).send("No webdata available");
    }
};

webdataController.updateWebdata = async (req, res) => {
    const webdata = new webdataModel({
        title: req.body.title,
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription
    });

    await webdataModel.findByIdAndUpdate(req.params.id, {$set: webdata}, { new: true });
    res.json({
        "status":"Webdata updated"
    });
};

module.exports = webdataController;