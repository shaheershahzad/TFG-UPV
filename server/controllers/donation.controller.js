const donationModel = require("../models/donation.model");
const donationController = {};

donationController.getDonations = async (req, res) => {
    const donations = await donationModel.find();
    res.json(donations);
};

donationController.getUserDonations = async (req, res) => {
    const userDonations = await donationModel.find({ donerID: req.params.id });
    res.json(userDonations);
};

donationController.createDonation = async (req, res) => {
    try {
        const donation = new donationModel({
            donerId: req.body.donerId,
            amount: req.body.amount,
            projectId: req.body.projectId,
            paymentMethod: req.body.paymentMethod,
            paymentDate: req.body.paymentDate
        });
        let don = await donation.save();
        res.json({
            "status":"Donation saved",
            "id": don._id
        });
    } catch (error) {
        console.log('err' + error);
        res.status(500).send(error);
    }
};

donationController.getDonation = async (req, res) => {
    const donation = await donationModel.findById(req.params.id);
    res.json(donation);
};

donationController.updateDonation = async (req, res) => {
    const donation = {
        donerId: req.body.donerId,
        amount: req.body.amount,
        projectId: req.body.projectId,
        paymentMethod: req.body.paymentMethod,
        paymentDate: req.body.paymentDate
    }
    await donationModel.findByIdAndUpdate(req.params.id, {$set: donation}, { new: true });
    res.json({
        "status":"Donation updated"
    });
};

donationController.deleteDonation = async (req, res) => {
    await donationModel.findByIdAndRemove(req.params.id);
    res.json({
        "status":"Donation deleted"
    });
};

module.exports = donationController;