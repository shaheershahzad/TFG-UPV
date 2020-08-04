const webdataModel = require("../models/webdata.model");
const webdataController = {};

webdataController.addWebdata = async (req, res) => {
    const webdata = new webdataModel({
        websiteTitle: req.body.title,
        websiteMetaTitle: req.body.metaTitle,
        websiteMetaDescription: req.body.metaDescription
    });

    console.log(webdata);
    console.log(req.body);

    const dataAvailable = await webdataModel.find();

    if(dataAvailable.length > 0){
        return res.status(500).send("Webdata is already available");
    }else{
        console.log(webdata);
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
    const webdata = {
        websiteTitle: req.body.websiteTitle,
        websiteMetaTitle: req.body.websiteMetaTitle,
        websiteMetaDescription: req.body.websiteMetaDescription
    }

    await webdataModel.findByIdAndUpdate(req.params.id, {$set: webdata}, { new: true });
    res.json({
        "status":"Webdata updated"
    });
};

module.exports = webdataController;