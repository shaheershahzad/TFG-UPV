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
    
    newsletterModel.findOne({ email: subscriber.email }, (err, user) => {
        if(!user){
            subscriber.save().then( function() {
                res.json({
                    "status":"Subscriber saved"
                });
            }, function(err) {
                return res.status(500).send("Error on saving email");
                }
            );
        }else{
            return res.status(500).send("Email already exists");
        }
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