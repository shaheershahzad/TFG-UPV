const newsletterModel = require("../models/newsletter.model");
const newsletterController = {};

newsletterController.getSubscribers = async (req, res) => {
    const subscribers = await newsletterModel.find();
    res.json(subscribers);
};

newsletterController.addSubscriber = async (req, res) => {
    const subscriber = new newsletterModel({
        email: req.body.email
    });
    await subscriber.save();
    res.json({
        "status":"Subscriber saved"
    });
};

newsletterController.getSubscriber = async (req, res) => {
    const subscriber = await newsletterModel.findById(req.params.id);
    res.json(subscriber);
};

newsletterController.updateSubscriber = async (req, res) => {
    const subscriber = {
        email: req.body.email
    }
    await newsletterModel.findByIdAndUpdate(req.params.id, {$set: subscriber}, { new: true});
    res.json({
        "status":"Subscriber updated"
    });
};

newsletterController.deleteSubscriber = async (req, res) => {
    await newsletterModel.findByIdAndRemove(req.params.id);
    res.json({
        "status":"Subscriber deleted"
    });
};

module.exports = newsletterController;